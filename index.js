const wasm = require('./pkg-cjs/poseidon_hash_wasm');

const SCALAR_FIELD =
  21888242871839275222246405745257275088548364400416034343698204186575808495617n;

/**
 * @param {Array<bigint>} inputs
 * @returns {bigint}
 */
function poseidon(inputs) {
  const hexInputs = inputs.map((input) => {
    if (input > SCALAR_FIELD) {
      return (input % SCALAR_FIELD).toString(16);
    } else {
      return input.toString(16);
    }
  });
  const hexOutput = wasm.poseidon(hexInputs);
  return BigInt('0x' + hexOutput);
}

module.exports = {
  poseidon,
  default: () => {},
  initSync: () => {},
}
