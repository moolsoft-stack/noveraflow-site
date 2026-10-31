import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {conversionResponse} from '../scripts/conversion-receiver.mjs';
const good = {event: 'web_start', language: 'en', source: 'google', scope: 'click', traffic: 'test', consent: 'granted_v1'};
function request(body = good, headers = {}, country = 'US') {
  const r = new Request('https://noveraflow.com/_events/conversion', {method: 'POST', headers: {Origin: 'https://noveraflow.com', 'Content-Type': 'application/json', ...headers}, body: JSON.stringify(body)});
  Object.defineProperty(r, 'cf', {value: {country}}); return r;
}
test('all four consented counters have only bounded fields; country comes from edge', async () => {
  const points = [], env = {NF_CONVERSIONS: {writeDataPoint: p => points.push(p)}};
  for (const event of ['store_android', 'store_ios', 'web_start', 'record_created']) {
    assert.equal((await conversionResponse(request({...good, event, scope: event === 'record_created' ? 'first_ack_in_page' : 'click'}), env)).status, 204);
  }
  assert.equal(points.length, 4);
  for (const p of points) { assert.equal(p.blobs[2], 'US'); assert.deepEqual(p.indexes, ['web_v1']); assert.deepEqual(p.doubles, [1]); assert.equal(p.blobs.length, 6); }
});
test('rejects no consent, arbitrary/private fields, spoofed origin, oversize and unsupported enum', async () => {
  let count = 0; const env = {NF_CONVERSIONS: {writeDataPoint: () => count++}};
  for (const body of [{...good, consent: 'no'}, {...good, email: 'synthetic@example.invalid'}, {...good, accountId: 'synthetic'}, {...good, source: 'https://secret.invalid/token'}, {...good, event: 'unknown'}, {...good, scope: 'account_first_ever'}]) assert.equal((await conversionResponse(request(body), env)).status, 400);
  assert.equal((await conversionResponse(request(good, {Origin: 'https://other.invalid'}), env)).status, 403);
  assert.equal((await conversionResponse(request(good, {Authorization: 'synthetic'}), env)).status, 403);
  assert.equal((await conversionResponse(request({...good, extra: 'a'.repeat(513)}), env)).status, 413);
  assert.equal(count, 0);
});
test('GPC/DNT never write; missing or broken collector fails without user data', async () => {
  let count = 0; const env = {NF_CONVERSIONS: {writeDataPoint: () => count++}};
  for (const header of ['Sec-GPC', 'DNT']) assert.equal((await conversionResponse(request(good, {[header]: '1'}), env)).status, 204);
  assert.equal(count, 0);
  assert.equal((await conversionResponse(request(), {})).status, 503);
  assert.equal((await conversionResponse(request(), {NF_CONVERSIONS: {writeDataPoint() {throw Error('sink')}}})).status, 503);
});
async function browser(lang, privacy = false) {
  const requests = [], listeners = {}, nodes = [];
  const node = tag => { const n = {tag, children: [], style: {}, append(...a) {this.children.push(...a);}, addEventListener() {}, showModal() {}, close() {}, remove() {}}; nodes.push(n); return n; };
  const body = node('body'), doc = {documentElement: {lang}, referrer: 'https://www.google.com/?q=synthetic-secret', body, readyState: 'complete', createElement: node, querySelector: () => body, addEventListener: (name, fn) => listeners[name] = fn};
  const window = {}; Object.defineProperty(window, 'localStorage', {get() {throw Error('tracking storage forbidden');}});
  let now = 10000;
  const ctx = {window, document: doc, navigator: {globalPrivacyControl: privacy}, URL, WeakSet, Map, Promise, location: new URL('https://noveraflow.com/?lang=' + lang + '&nf_measurement_test=1'), performance: {now: () => now}, fetch: (url, options) => { requests.push({url, options, payload: JSON.parse(options.body)}); return Promise.resolve({status: 204}); }};
  vm.runInNewContext(await readFile(new URL('../js/conversions.js', import.meta.url), 'utf8'), ctx);
  return {requests, nodes, window, click(href) { const event = {isTrusted: true, target: {closest: () => ({href})}}; listeners.click(event); listeners.click(event); }, advance() {now += 2000;}, allow() { window.NFConversions.openPreferences(lang); const d = nodes.findLast(n => n.tag === 'dialog'); const buttons = d.children.find(n => n.tag === 'div').children; buttons[1]?.onclick(); }, stop() {window.NFConversions.openPreferences(lang); nodes.findLast(n => n.tag === 'dialog').children.find(n => n.tag === 'div').children[0].onclick();}};
}
test('each language: off before explicit choice, three CTAs plus ACK once, no storage or sensitive URL', async () => {
  for (const lang of ['en', 'ko', 'ja']) {
    const b = await browser(lang);
    b.click('https://noveraflow.com/app/?lang=' + lang); assert.equal(b.requests.length, 0);
    b.allow();
    const links = ['https://play.google.com/store/apps/details?id=com.moolsoft.noveraflow', 'https://apps.apple.com/app/id6792970947', 'https://noveraflow.com/app/?lang=' + lang];
    for (const href of links) { b.click(href); b.click(href); b.advance(); }
    b.window.NFConversions.firstRecordAck(lang); b.window.NFConversions.firstRecordAck(lang);
    assert.deepEqual(b.requests.map(r => r.payload.event), ['store_android', 'store_ios', 'web_start', 'record_created']);
    for (const r of b.requests) { assert.equal(r.payload.language, lang); assert.equal(r.payload.source, 'google'); assert.equal(r.payload.traffic, 'test'); assert.equal(r.options.credentials, 'omit'); assert.equal(r.options.referrerPolicy, 'no-referrer'); assert.ok(!r.options.body.includes('synthetic-secret')); }
    b.stop(); b.click(links[0]); assert.equal(b.requests.length, 4);
  }
});
test('browser privacy signal cannot opt in or send', async () => {
  const b = await browser('en', true); b.allow(); b.click('https://noveraflow.com/app/?lang=en'); b.window.NFConversions.firstRecordAck('en'); assert.equal(b.requests.length, 0);
});
