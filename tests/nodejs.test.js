const test = require('tape');
const circomlibjs = require('circomlibjs');
const noble = require('@noble/curves/abstract/poseidon');
// import { Field as Fp, validateField } from '../esm/abstract/modular.js';
const {Field} = require('@noble/curves/abstract/modular');
const wasm = require('../pkg-cjs');

function hexToBigInt(str) {
  return BigInt('0x' + str);
}

function bigIntToHex(bigint) {
  return bigint.toString(16);
}

// function hexToUint8Array(str) {
//   return Uint8Array.from(Buffer.from(str, 'hex')).reverse();
// }

function hexToBytes(hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
  }
  if (hex.length % 2)
    throw new Error('hexToBytes: received invalid unpadded hex');
  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < array.length; i++) {
    const j = i * 2;
    const hexByte = hex.slice(j, j + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error('Invalid byte sequence');
    array[i] = byte;
  }
  return array;
}

const hexes = Array.from({length: 256}, (v, i) =>
  i.toString(16).padStart(2, '0'),
);
function bytesToHex(uint8a) {
  // pre-caching improves the speed 6x
  if (!(uint8a instanceof Uint8Array)) throw new Error('Uint8Array expected');
  let hex = '';
  for (let i = 0; i < uint8a.length; i++) {
    hex += hexes[uint8a[i]];
  }
  return hex;
}

const A = 'deadbeef';
// const A = 'efbeadde';
const B = '12345678';
// const B = '78563412';
const X = '2943ee1055ca037cf1babdcf9fac8576498f9edec7552072342a32e547acd0c1';

let jsX, rsX;

test('poseidon from hsg88/circomlibjs', async (t) => {
  const an = BigInt('0xdeadbeef');
  const bn = BigInt('0x12345678');
  const xn = circomlibjs.poseidon([an, bn]);
  const x = xn.toString(16);
  t.equals(x, X);
});

test('poseidon from @noble/curves', async (t) => {
  const poseidon = noble.poseidon({
    Fp: Field(
      BigInt(
        '21888242871839275222246405745257275088548364400416034343698204186575808495617',
      ),
    ),
    roundsFull: 8,
    roundsPartial: 57, // dependent on the number of inputs. 2 inputs here
  });
  // t: number;
  // roundsFull: number;
  // roundsPartial: number;
  // sboxPower?: number;
  // reversePartialPowIdx?: boolean; // Hack for stark
  // mds: bigint[][];
  // roundConstants: bigint[][];
});

test.skip('poseidon from circomlibjs iden3', async (t) => {
  const a8 = hexToBytes(A);
  console.log(a8);
  const b8 = hexToBytes(B);
  console.log(b8);
  const poseidon = await circomlibjs.buildPoseidon();
  const x8 = poseidon([a8, b8]);
  console.log(x8);
  const x = bytesToHex(x8);
  console.log(x);
  jsX = x;
  // t.equals(x, X);
});

test.skip('poseidon from WASM', async (t) => {
  const x = wasm.poseidon(A, B);
  rsX = x;

  if (jsX === rsX) {
    console.log('VICTORY');
  }
  // t.equals(x, X);
});
