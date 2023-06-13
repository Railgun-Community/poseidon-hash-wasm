const {run, compare, utils} = require('micro-bmark');
const circomlibjs = require('circomlibjs');
const wasm = require('../');

run(async () => {
  utils.logMem();
  let x = 'deadbeef';
  const B = '12345678';

  await compare('poseidon', 5000, {
    hsg88_circomlib() {
      const an = BigInt('0x' + x);
      const bn = BigInt('0x' + B);
      const xn = circomlibjs.poseidon([an, bn]);
      x = xn.toString(16);
    },
    rs_poseidon_wasm() {
      x = wasm.poseidon([x, B]);
    },
  });

  utils.logMem();
});
