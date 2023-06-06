mod utils;

use rs_poseidon::poseidon::hash;
use ruint::aliases::U256;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn poseidon(a: &str, b: &str) -> String {
    let an: U256 = U256::from_str_radix(a, 16).unwrap();
    let bn: U256 = U256::from_str_radix(b, 16).unwrap();
    let xn = hash(&[an, bn]);
    hex::encode(xn.to_be_bytes_trimmed_vec())
}
