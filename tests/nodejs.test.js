const test = require('tape');
const circomlibjs = require('circomlibjs');
const wasm = require('../');
const lowLevelWasmPoseidon = require('../pkg-cjs/poseidon_hash_wasm').poseidon

function hexToBigInt(hex) {
  return BigInt('0x' + hex);
}

const Ahex = 'deadbeef';
const Bhex = '12345678';
const Chex = 'abcdef01';
const X1hex = '149b6b5dff5c93c8a38545d6cc7f8a184b06ea786180e84c4693723599759ef5';
const X2hex = '2943ee1055ca037cf1babdcf9fac8576498f9edec7552072342a32e547acd0c1';
const X3hex = '20537df81eef1e45abd85ec45a52f5d3257597f6b6a54b75743caeeac200f258';
const HUGE1hex = '9960238a86a7ecff390b7f37f680e7468fa0c41ee3704fcc68f0be82d19be4b2';
const HUGE2hex = '7866051267741975227839256886788119796968652873699356069992477395';
const HUGEOUThex = '242d78b4397fab47fc6b5d95f73409ff60e113f6fa56992a8da7c363b67e28f3';
const A = hexToBigInt(Ahex);
const B = hexToBigInt(Bhex);
const C = hexToBigInt(Chex);
const X1 = hexToBigInt(X1hex);
const X2 = hexToBigInt(X2hex);
const X3 = hexToBigInt(X3hex);
const HUGE1 = hexToBigInt(HUGE1hex);
const HUGE2 = hexToBigInt(HUGE2hex);
const HUGEOUT = hexToBigInt(HUGEOUThex);

test('rs-poseidon should have the correct module shape', async (t) => {
  t.equal(typeof wasm, 'object', 'exports is an object');
  t.equal(typeof wasm.default, 'function', 'exports.default is a function');
  t.equal(
    typeof wasm.poseidon,
    'function',
    'exports.poseidon is a function',
  );
  t.equal(
    typeof wasm.poseidonHex,
    'function',
    'exports.poseidonHex is a function',
  );
  t.equal(wasm.__esModule, true, 'exports.__esModule is true');
});

test('hsg88/circomlibjs poseidon 1-arg', async (t) => {
  const x = circomlibjs.poseidon([A]);
  t.equals(x, X1, 'is correct');
});

test('hsg88/circomlibjs poseidon 2-arg', async (t) => {
  const x = circomlibjs.poseidon([A, B]);
  t.equals(x, X2, 'is correct');
});

test('hsg88/circomlibjs poseidon 3-arg', async (t) => {
  const x = circomlibjs.poseidon([A, B, C]);
  t.equals(x, X3, 'is correct');
});

test('hsg88/circomlibjs with huge numbers', async (t) => {
  const x = circomlibjs.poseidon([HUGE1, HUGE2]);
  t.equal(x, HUGEOUT, 'is correct')
})

test('rs-poseidon wasm poseidon 1-arg', async (t) => {
  const x = wasm.poseidon([A]);
  t.equals(x, X1, 'is correct');
});

test('rs-poseidon wasm poseidon 2-arg', async (t) => {
  const x = wasm.poseidon([A, B]);
  t.equals(x, X2, 'is correct');
});

test('rs-poseidon wasm poseidon 3-arg', async (t) => {
  const x = wasm.poseidon([A, B, C]);
  t.equals(x, X3, 'is correct');
});

test('rs-poseidon with huge numbers', async (t) => {
  const x = wasm.poseidon([HUGE1, HUGE2]);
  t.equal(x, HUGEOUT, 'is correct')
})

test('rs-poseidon Hex wasm poseidon 1-arg', async (t) => {
  const x = wasm.poseidonHex([Ahex]);
  t.equals(x, X1hex, 'is correct');
});

test('rs-poseidon Hex wasm poseidon 2-arg', async (t) => {
  const x = wasm.poseidonHex([Ahex, Bhex]);
  t.equals(x, X2hex, 'is correct');
});

test('rs-poseidon Hex wasm poseidon 3-arg', async (t) => {
  const x = wasm.poseidonHex([Ahex, Bhex, Chex]);
  t.equals(x, X3hex, 'is correct');
});

test('rs-poseidon Hex with huge numbers', async (t) => {
  const x = wasm.poseidonHex([HUGE1hex, HUGE2hex]);
  t.equal(x, HUGEOUThex, 'is correct')
})

test('rs-poseidon wasm poseidon wrong input: not an array', async (t) => {
  t.throws(() => {
    lowLevelWasmPoseidon(A, B);
  }, /TypeError: expected an array of hexadecimal strings/);
});

test('rs-poseidon wasm poseidon wrong input: array of numbers', async (t) => {
  t.throws(() => {
    lowLevelWasmPoseidon([1, 2]);
  }, /TypeError: expected an array of hexadecimal strings/);
});

test('rs-poseidon wasm poseidon wrong input: array of not hex', async (t) => {
  t.throws(() => {
    lowLevelWasmPoseidon(['foo', 'bar']);
  }, /TypeError: expected an array of hexadecimal strings/);
});
