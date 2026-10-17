import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../js/landing-init.js', import.meta.url), 'utf8');
function browser(time, storage = new Map(), blocked = false) {
  let now = Date.parse(time);
  let pending;
  const events = {};
  const root = { dataset: {} };
  const context = {
    Date: { now: () => now }, navigator: {}, matchMedia: () => ({ matches: false }),
    document: { documentElement: root, querySelectorAll: () => [],
      addEventListener: (name, callback) => { events[name] = callback; } },
    window: { addEventListener: (name, callback) => { events[name] = callback; } },
    sessionStorage: Object.fromEntries(['getItem', 'setItem', 'removeItem'].map(name => [name, (key, value) => {
      if (blocked) throw new Error('Storage disabled');
      return name === 'getItem' ? storage.get(key) ?? null : name === 'setItem' ? storage.set(key, value) : storage.delete(key);
    }])),
    clearTimeout: () => {}, setTimeout: (callback, delay) => { pending = { callback, delay }; },
  };
  vm.runInNewContext(source, context);
  return { root, storage, events, controller: context.window.NoveraFlowScene,
    advance(time, event) { now = Date.parse(time); (event ? events[event] : pending.callback)(); },
    delay: () => pending.delay };
}

test('KST slots change at 00/08/16 and alternate across midnight for every visitor', () => {
  const times = ['2026-10-17T00:00:00+09:00', '2026-10-17T08:00:00+09:00',
    '2026-10-17T16:00:00+09:00', '2026-10-18T00:00:00+09:00', '2026-10-18T08:00:00+09:00'];
  const scenes = times.map(time => browser(time).root.dataset.scene);
  scenes.slice(1).forEach((scene, i) => assert.notEqual(scene, scenes[i]));
  assert.notEqual(scenes[0], scenes[3]);
  times.forEach((time, i) => {
    assert.equal(browser(new Date(Date.parse(time)).toISOString()).root.dataset.scene, scenes[i]);
    const before = browser(new Date(Date.parse(time) - 1).toISOString());
    assert.notEqual(before.root.dataset.scene, scenes[i]);
    assert.equal(before.delay(), 26);
    before.advance(time);
    assert.equal(before.root.dataset.scene, scenes[i]);
  });
});

test('manual selection persists on navigation and expires at the next slot even after tab suspension', () => {
  const time = '2026-10-17T15:59:59+09:00';
  const tab = browser(time);
  const chosen = tab.root.dataset.scene === 'A' ? 'B' : 'A';
  tab.controller.select(chosen);
  const refreshed = browser(time, tab.storage);
  assert.equal(refreshed.root.dataset.scene, chosen);
  assert.equal(refreshed.root.dataset.sceneMode, 'manual');
  refreshed.advance('2026-10-18T00:01:00+09:00', 'pageshow');
  assert.equal(refreshed.root.dataset.sceneMode, 'auto');
  assert.equal(refreshed.root.dataset.scene, browser('2026-10-18T00:01:00+09:00').root.dataset.scene);
  assert.equal(tab.storage.has('noveraflow.landing.override'), false);
});

test('storage denial or corrupt data cannot prevent deterministic rendering', () => {
  const time = '2026-10-17T19:00:00+09:00';
  for (const tab of [browser(time, new Map(), true), browser(time, new Map([['noveraflow.landing.override', '{invalid']]))]) {
    assert.equal(tab.root.dataset.scene, browser(time).root.dataset.scene);
    tab.controller.select('A');
    assert.equal(tab.root.dataset.scene, 'A');
    tab.controller.select('invalid');
    assert.equal(tab.root.dataset.scene, 'A');
    tab.advance('2026-10-18T00:00:00+09:00');
    assert.equal(tab.root.dataset.sceneMode, 'auto');
  }
});
