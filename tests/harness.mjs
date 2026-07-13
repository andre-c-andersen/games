// Shared headless test harness: stubs the DOM the game needs, drives the
// fixed-timestep loop with a fake clock, and simulates keyboard input.
// Run tests with plain node: `node tests/smoke.mjs`

export function setup({ search = '' } = {}) {
  // all game randomness flows through Math.random, so a seeded PRNG
  // (mulberry32) makes every run reproducible. TEST_SEED=n explores others;
  // the seed is printed so any failure can be replayed exactly.
  const seed = Number(process.env.TEST_SEED ?? 1) >>> 0;
  let s = seed;
  Math.random = () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  console.log('rng seed: ' + seed);

  const ctxStub = new Proxy({}, {
    get: (t, p) => typeof p === 'symbol' ? undefined : (t[p] ??= () => {}),
    set: (t, p, v) => (t[p] = v, true),
  });
  const canvas = { style: {}, width: 0, height: 0, getContext: () => ctxStub, addEventListener: () => {} };
  const winHandlers = {};

  globalThis.window = {
    innerWidth: 1440,
    innerHeight: 720,
    devicePixelRatio: 1,
    addEventListener: (t, fn) => { (winHandlers[t] ||= []).push(fn); },
  };
  globalThis.document = { getElementById: () => canvas, addEventListener: () => {} };
  globalThis.location = { search };
  const store = {};
  globalThis.localStorage = {
    getItem: k => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: k => { delete store[k]; },
  };
  Object.defineProperty(globalThis, 'navigator', {
    value: { maxTouchPoints: 0, getGamepads: () => [] },
    configurable: true,
  });

  let rafCb = null;
  let simNow = 0;
  globalThis.requestAnimationFrame = cb => { rafCb = cb; };
  // 17ms > one 60Hz step, so every callback advances the simulation ≥1 step
  const runFrames = n => {
    for (let i = 0; i < n; i++) {
      simNow += 17;
      const cb = rafCb;
      rafCb = null;
      cb(simNow);
    }
  };

  const keyDown = key => { for (const fn of winHandlers.keydown || []) fn({ key, repeat: false, preventDefault: () => {} }); };
  const keyUp = key => { for (const fn of winHandlers.keyup || []) fn({ key }); };
  const pressKey = key => { keyDown(key); keyUp(key); };

  return { store, winHandlers, runFrames, keyDown, keyUp, pressKey };
}

export const assert = (cond, msg) => {
  if (!cond) { console.error('FAIL: ' + msg); process.exit(1); }
  console.log('ok: ' + msg);
};

export const importGame = mod => import(new URL('../mooncraft/js/' + mod, import.meta.url));
