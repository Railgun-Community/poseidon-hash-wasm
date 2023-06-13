mod utils;

use js_sys::Array;
use rs_poseidon::poseidon::hash;
use ruint::aliases::U256;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn poseidon(args: &Array) -> Result<String, JsValue> {
    let error_message = "TypeError: expected an array of hexadecimal strings";
    // Get an array or throw an error
    if !args.is_array() {
        return Err(JsValue::from_str(error_message));
    }

    let mut inputs: Vec<U256> = Vec::new();
    let res = args.iter().try_for_each(|arg| {
        if !arg.is_string() {
            return Err(JsValue::from_str(error_message));
        }
        let u256 = U256::from_str_radix(arg.as_string().unwrap().as_str(), 16);
        match u256 {
            Err(_) => return Err(JsValue::from_str(error_message)),
            Ok(_) => {
                inputs.push(u256.unwrap());
                Ok(())
            }
        }
    });
    if res.is_err() {
        return Err(res.err().unwrap());
    }

    let output = hash(&inputs);
    Ok(hex::encode(output.to_be_bytes_trimmed_vec()))
}
