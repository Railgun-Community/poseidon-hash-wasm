const wasm = require('./pkg-cjs/poseidon_hash_wasm');

const SCALAR_FIELD =
  21888242871839275222246405745257275088548364400416034343698204186575808495617n;

module.exports = {
  poseidon(inputs) {
    const hexInputs = inputs.map((input) => {
      if (input > SCALAR_FIELD) {
        return (input % SCALAR_FIELD).toString(16);
      } else {
        return input.toString(16);
      }
    });
    const hexOutput = wasm.poseidon(hexInputs);
    return BigInt('0x' + hexOutput);
  },
  poseidonHex: wasm.poseidon,
  default() {
    return Promise.resolve();
  },
  initSync: () => {},
  __esModule: true,
};
