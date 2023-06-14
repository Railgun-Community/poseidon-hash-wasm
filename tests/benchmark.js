const {run, compare, utils} = require('micro-bmark');
const circomlibjs = require('circomlibjs');
const poseidonWasm = require('../');

function hexToBigInt(hex) {
  return BigInt('0x' + hex);
}

run(async () => {
  utils.logMem();
  let x = hexToBigInt('deadbeef');
  const A = hexToBigInt('12345678');
  const B = hexToBigInt('9960238a86a7ecff390b7f37f680e7468fa0c41ee3704fcc68f0be82d19be4b2');

  await compare('poseidon with small numbers', 5000, {
    hsg88_circomlib() {
      x = circomlibjs.poseidon([x, A]);
    },
    rs_poseidon_wasm() {
      x = poseidonWasm([x, A]);
    },
  });

  await compare('poseidon with large numbers', 5000, {
    hsg88_circomlib() {
      x = circomlibjs.poseidon([x, B]);
    },
    rs_poseidon_wasm() {
      x = poseidonWasm([x, B]);
    },
  });

  utils.logMem();
});
