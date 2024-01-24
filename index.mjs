import init from './pkg-esm/poseidon_hash_wasm.js';
import * as pkg from './pkg-esm/poseidon_hash_wasm.js';

const SCALAR_FIELD =
  21888242871839275222246405745257275088548364400416034343698204186575808495617n;

export function poseidon(inputs) {
  const hexInputs = inputs.map(input => {
    if (input > SCALAR_FIELD) {
      return (input % SCALAR_FIELD).toString(16);
    } else {
      return input.toString(16);
    }
  })
  const hexOutput = pkg.poseidon(hexInputs);
  return BigInt('0x' + hexOutput);
};

export function poseidonHex(hexInputs) {
  return pkg.poseidon(hexInputs);
}

export default init;
export const initSync = pkg.initSync;