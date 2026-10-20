import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { mountContactForm } from '../js/contact.js';

async function translations() {
  const window = { location: { search: '?lang=en' }, localStorage: { getItem() { return ''; } } };
  const context = { window, URLSearchParams, navigator: { language: 'en' }, document: { documentElement: { dataset: {} }, addEventListener() {} } };
  vm.runInNewContext(await readFile(new URL('../js/i18n.js', import.meta.url), 'utf8'), context);
  return window.NoveraFlowI18n;
}
function fixture({ fetchImpl, i18n }) {
  const events = {}, typeEvents = {}, button = {}, status = {}, details = {};
  const values = { type: 'bug', email: 'test@example.net', name: 'Test', subject: '[TEST] example', message: '[TEST] No reply needed', website: '', platform: 'android', appVersion: '1.0.test' };
  const fields = Object.fromEntries(Object.entries(values).map(([name, value]) => [name, { value }]));
  fields.type.addEventListener = (event, listener) => { typeEvents[event] = listener; };
  const form = {
    elements: fields, reportValidity: () => true, setAttribute() {},
    querySelector: selector => selector === 'fieldset' ? details : selector === '[role="status"]' ? status : button,
    querySelectorAll: () => Object.values(fields),
    addEventListener: (event, listener) => { events[event] = listener; },
    reset: () => { for (const field of Object.values(fields)) field.value = ''; }
  };
  const localeEvents = {};
  const mounted = mountContactForm(form, { fetchImpl, i18n, eventTarget: { addEventListener: (event, listener) => { localeEvents[event] = listener; } } });
  return { ...mounted, fields, button, status, details, change: () => typeEvents.change(), localeChange: () => localeEvents['noveraflow:localechange']() };
}
const event = () => ({ preventDefault() {} });

test('all form keys translate into ko/en/ja, six stable category values, no mailto', async () => {
  const i18n = await translations(), html = await readFile(new URL('../contact.html', import.meta.url), 'utf8');
  for (const locale of ['ko', 'en', 'ja']) {
    for (const [, key] of html.matchAll(/data-i18n="(contact\.[^"]+)"/g)) assert.notEqual(i18n.message(key, locale), key);
    for (const state of ['sending', 'success', 'failed', 'unconfirmed', 'limited']) assert.notEqual(i18n.message(`contact.form.${state}`, locale), `contact.form.${state}`);
  }
  assert.doesNotMatch(html, /mailto:/);
  for (const type of ['general', 'feature', 'bug', 'partnership', 'advertising', 'other']) assert.ok(html.includes(`value="${type}"`));
  assert.match(html, /type="email"[^>]*required/); assert.match(html, /maxlength="6000" required/);
});

test('submit waits for confirmed acceptance, blocks duplicate clicks and clears only after success', async () => {
  const i18n = await translations(); let resolve, count = 0, request;
  const ui = fixture({ i18n, fetchImpl: async (url, options) => { count++; request = { url, options }; return new Promise(done => { resolve = done; }); } });
  const first = ui.submit(event());
  assert.equal(ui.button.disabled, true); assert.equal(ui.fields.subject.disabled, true);
  await ui.submit(event()); assert.equal(count, 1); assert.notEqual(ui.fields.subject.value, '');
  i18n.locale = 'ja'; ui.localeChange(); assert.equal(ui.button.textContent, '送信中…');
  resolve({ ok: true, json: async () => ({ ok: true, status: 'accepted' }) }); await first;
  assert.equal(ui.fields.subject.value, ''); assert.equal(ui.button.disabled, false);
  assert.equal(ui.status.textContent, i18n.message('contact.form.success'));
  assert.equal(request.options.credentials, 'omit'); assert.ok(request.options.headers['Idempotency-Key']);
  assert.equal(request.url, 'https://admin.noveraflow.com/api/public/site-contact');
  const payload = JSON.parse(request.options.body); assert.equal(payload.platform, 'android'); assert.equal(payload.appVersion, '1.0.test');
  assert.equal(payload.to, undefined);
});

test('non-app categories omit optional app details without losing typed values on failure', async () => {
  const i18n = await translations(); let payload;
  const ui = fixture({ i18n, fetchImpl: async (_, options) => { payload = JSON.parse(options.body); return { ok: false, status: 503, json: async () => ({ ok: false, error: 'contact_unavailable' }) }; } });
  ui.fields.type.value = 'partnership'; ui.change(); assert.equal(ui.details.hidden, true); assert.equal(ui.details.disabled, true);
  await ui.submit(event());
  assert.equal(payload.platform, undefined); assert.equal(payload.appVersion, undefined);
  assert.equal(ui.fields.subject.value, '[TEST] example'); assert.equal(ui.fields.appVersion.value, '1.0.test');
  assert.equal(ui.status.textContent, i18n.message('contact.form.failed'));
  ui.fields.type.value = 'feature'; ui.change(); assert.equal(ui.details.hidden, false); assert.equal(ui.details.disabled, false);
});

test('network failure preserves data and idempotency key; unconfirmed response is never success', async () => {
  const i18n = await translations(), keys = [];
  const ui = fixture({ i18n, fetchImpl: async (_, options) => { keys.push(options.headers['Idempotency-Key']); throw Error('offline'); } });
  await ui.submit(event()); await ui.submit(event());
  assert.equal(keys[0], keys[1]); assert.equal(ui.fields.message.value, '[TEST] No reply needed');
  assert.equal(ui.status.textContent, i18n.message('contact.form.unconfirmed')); assert.equal(ui.button.disabled, false);
  const falseSuccess = fixture({ i18n, fetchImpl: async () => ({ ok: true, json: async () => ({ ok: true }) }) });
  await falseSuccess.submit(event()); assert.equal(falseSuccess.fields.subject.value, '[TEST] example');
  assert.equal(falseSuccess.status.textContent, i18n.message('contact.form.failed'));
});
