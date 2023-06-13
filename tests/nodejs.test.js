const test = require('tape');
const circomlibjs = require('circomlibjs');
const wasm = require('../');

const A = 'deadbeef';
const B = '12345678';
const C = 'abcdef01';
const X1 = '149b6b5dff5c93c8a38545d6cc7f8a184b06ea786180e84c4693723599759ef5';
const X2 = '2943ee1055ca037cf1babdcf9fac8576498f9edec7552072342a32e547acd0c1';
const X3 = '20537df81eef1e45abd85ec45a52f5d3257597f6b6a54b75743caeeac200f258';

test('hsg88/circomlibjs poseidon 1-arg', async (t) => {
  const an = BigInt('0x' + A);
  const xn = circomlibjs.poseidon([an]);
  const x = xn.toString(16);
  t.equals(x, X1, 'is correct');
});

test('hsg88/circomlibjs poseidon 2-arg', async (t) => {
  const an = BigInt('0x' + A);
  const bn = BigInt('0x' + B);
  const xn = circomlibjs.poseidon([an, bn]);
  const x = xn.toString(16);
  t.equals(x, X2, 'is correct');
});

test('hsg88/circomlibjs poseidon 3-arg', async (t) => {
  const an = BigInt('0x' + A);
  const bn = BigInt('0x' + B);
  const cn = BigInt('0x' + C);
  const xn = circomlibjs.poseidon([an, bn, cn]);
  const x = xn.toString(16);
  t.equals(x, X3, 'is correct');
});

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

test('rs-poseidon wasm poseidon wrong input: not an array', async (t) => {
  t.throws(() => {
    wasm.poseidon(A, B);
  }, /TypeError: expected an array of hexadecimal strings/);
});

test('rs-poseidon wasm poseidon wrong input: array of numbers', async (t) => {
  t.throws(() => {
    wasm.poseidon([1, 2]);
  }, /TypeError: expected an array of hexadecimal strings/);
});

test('rs-poseidon wasm poseidon wrong input: array of not hex', async (t) => {
  t.throws(() => {
    wasm.poseidon(['foo', 'bar']);
  }, /TypeError: expected an array of hexadecimal strings/);
});
