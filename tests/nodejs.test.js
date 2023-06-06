const test = require('tape');
const circomlibjs = require('circomlibjs');
const wasm = require('../');

const A = 'deadbeef';
const B = '12345678';
const X = '2943ee1055ca037cf1babdcf9fac8576498f9edec7552072342a32e547acd0c1';

test('poseidon from circomlibjs (hsg88 fork)', async (t) => {
  const an = BigInt('0xdeadbeef');
  const bn = BigInt('0x12345678');
  const xn = circomlibjs.poseidon([an, bn]);
  const x = xn.toString(16);
  t.equals(x, X, 'is correct');
});

test('poseidon from WASM (rs-poseidon)', async (t) => {
  const x = wasm.poseidon(A, B);
  t.equals(x, X, 'is correct');
});
