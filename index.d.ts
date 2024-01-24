/**
* @param {Array<bigint>} args
* @returns {bigint}
*/
export function poseidon(args: Array<bigint>): bigint;

/**
* @param {Array<string>} args
* @returns {string}
*/
export function poseidonHex(args: Array<string>): string;

declare function init(): Promise<void>;

export default init;
export const initSync: () => void;