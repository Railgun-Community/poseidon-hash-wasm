const test = require('tape');
const circomlibjs = require('circomlibjs');
const poseidonWasm = require('../');
const lowLevelWasmPoseidon = require('../pkg-cjs/poseidon_hash_wasm').poseidon

function hexToBigInt(hex) {
  return BigInt('0x' + hex);
}

const A = hexToBigInt('deadbeef');
const B = hexToBigInt('12345678');
const C = hexToBigInt('abcdef01');
const X1 = hexToBigInt('149b6b5dff5c93c8a38545d6cc7f8a184b06ea786180e84c4693723599759ef5');
const X2 = hexToBigInt('2943ee1055ca037cf1babdcf9fac8576498f9edec7552072342a32e547acd0c1');
const X3 = hexToBigInt('20537df81eef1e45abd85ec45a52f5d3257597f6b6a54b75743caeeac200f258');
const HUGE1 = hexToBigInt('9960238a86a7ecff390b7f37f680e7468fa0c41ee3704fcc68f0be82d19be4b2');
const HUGE2 = hexToBigInt('7866051267741975227839256886788119796968652873699356069992477395');
const HUGEOUT = hexToBigInt('242d78b4397fab47fc6b5d95f73409ff60e113f6fa56992a8da7c363b67e28f3');

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
  const x = poseidonWasm([A]);
  t.equals(x, X1, 'is correct');
});

test('rs-poseidon wasm poseidon 2-arg', async (t) => {
  const x = poseidonWasm([A, B]);
  t.equals(x, X2, 'is correct');
});

test('rs-poseidon wasm poseidon 3-arg', async (t) => {
  const x = poseidonWasm([A, B, C]);
  t.equals(x, X3, 'is correct');
});

test('rs-poseidon with huge numbers', async (t) => {
  const x = poseidonWasm([HUGE1, HUGE2]);
  t.equal(x, HUGEOUT, 'is correct')
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
