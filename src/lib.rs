mod utils;

use std::convert::TryInto;

use dusk_bls12_381::BlsScalar;
use dusk_poseidon::sponge::hash;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

}

fn from_hex(hex: &str) -> u64 {
    u64::from_str_radix(hex, 16).unwrap()
}

fn u64_to_u8(x: [u64; 4]) -> Vec<u8> {
    let mut result = Vec::new();
    for i in 0..4 {
        result.push((x[i] >> 24) as u8);
        result.push((x[i] >> 16) as u8);
        result.push((x[i] >> 8) as u8);
        result.push(x[i] as u8);
    }
    result
}

#[wasm_bindgen]
pub fn poseidon(a: &str, b: &str) -> String {
    log(format!("Rust a: {}", a).as_str());
    let mut a8 = hex::decode(a).unwrap();
    a8.resize(64, 0);
    // a8.reverse();
    log(format!("Rust a8: {:?}", a8).as_str());

    // let mut a512: [u8; 64] = [0u8; 64];
    // for (place, element) in a512.iter_mut().zip(a8.iter()) {
    //     *place = *element;
    // }
    // log(format!("Rust a512: {:?}", a512).as_str());

    log(format!("Rust b: {}", b).as_str());
    let mut b8 = hex::decode(b).unwrap();
    b8.resize(64, 0);
    // b8.reverse();
    log(format!("Rust b8: {:?}", b8).as_str());

    // let mut b512: [u8; 64] = [0u8; 64];
    // for (place, element) in b512.iter_mut().zip(b8.iter()) {
    //     *place = *element;
    // }
    // log(format!("Rust b512: {:?}", b512).as_str());

    // log(format!("Rust au64: {:?}", from_hex(a)).as_str());
    // log(format!("Rust bu64: {:?}", from_hex(b)).as_str());

    const R2: BlsScalar = BlsScalar([
        0xc999e990f3f29c6d,
        0x2b6cedcb87925c23,
        0x05d314967254398f,
        0x0748d9d99f59ff11,
    ]);

    // let ar: [u8; 64] = a8.try_into().unwrap();
    // let an = BlsScalar::from_bytes_wide(&ar);
    // let an: BlsScalar = from_hex(a).into();
    // let an: BlsScalar = BlsScalar([0, 0, 0, from_hex(a)]);

    // let an = BlsScalar([0x00000000deadbeef, 0, 0, 0]) * R2;
    // let bn = BlsScalar([0x0000000012345678, 0, 0, 0]) * R2;
    // hash output c61db0967b1b9733d09620268fcf4a1b5fd706da4915ab301157dd191f35761e

    // let an = BlsScalar([0x00000000efbeadde, 0, 0, 0]) * R2;
    // let bn = BlsScalar([0x0000000078563412, 0, 0, 0]) * R2;
    // hash output 1e434bc4edf3e6e89d5a2eec851a381c4d89049c71556552f8b64df18fde184e

    // let an = BlsScalar([0xefbeadde00000000, 0, 0, 0]) * R2;
    // let bn = BlsScalar([0x7856341200000000, 0, 0, 0]) * R2;
    // hash output ddcfe363ffcdeb96bce781679a6c544399a309da28d08893aa59cb20a34f183e

    // let an = BlsScalar([0xdeadbeef00000000, 0, 0, 0]) * R2;
    // let bn = BlsScalar([0x1234567800000000, 0, 0, 0]) * R2;
    // hash output 0d2768392aca77902b62f5927878372b6a3757e93622ffc3567ca2cff4498732

    // let an = BlsScalar([0x00000000deadbeef, 0, 0, 0]);
    // let bn = BlsScalar([0x0000000012345678, 0, 0, 0]);
    // hash output 813199c0528eecd390d0448fcc5e7dd25f98d642b706b77425eec3ca3e7faf5c

    // let an = BlsScalar([0x00000000efbeadde, 0, 0, 0]);
    // let bn = BlsScalar([0x0000000078563412, 0, 0, 0]);
    // hash output 6a8384138fe4d05ffc4e5efcf2bd4ec17f3e3c1fe66756764cda711a7004f142

    // let an = BlsScalar([0xefbeadde00000000, 0, 0, 0]);
    // let bn = BlsScalar([0x7856341200000000, 0, 0, 0]);
    // hash output 4d69324b2ed51bd0bac92028759650e161daa2fced3ea9d69c42a803ad963a42

    // let an = BlsScalar([0xdeadbeef00000000, 0, 0, 0]);
    // let bn = BlsScalar([0x1234567800000000, 0, 0, 0]);
    // hash output 4ddce0cd9cc851f10723d93f0bc1aa88f3952c2b669a8c924197af08676f1b54

    // let an = BlsScalar([0, 0, 0, 0x00000000deadbeef]) * R2;
    // let bn = BlsScalar([0, 0, 0, 0x0000000012345678]) * R2;
    // hash output 140e577f2e62253746cf3cdcbe224872fd33e07765f7a3fd656935898d344f35

    // let an = BlsScalar([0, 0, 0, 0x00000000efbeadde]) * R2;
    // let bn = BlsScalar([0, 0, 0, 0x0000000078563412]) * R2;
    // hash output 06fbbbb28cce20540b37f868a0c186a782da8c3d9441f553c273d548e8827d64

    // let an = BlsScalar([0, 0, 0, 0xefbeadde00000000]) * R2;
    // let bn = BlsScalar([0, 0, 0, 0x7856341200000000]) * R2;
    // hash output f225d4f25469494daf683d4064b8cdaf00b25851d9f79c08befca768e6c6d12d

    // let an = BlsScalar([0, 0, 0, 0xdeadbeef00000000]) * R2;
    // let bn = BlsScalar([0, 0, 0, 0x1234567800000000]) * R2;
    // hash output 46f35774d127602c987951f5f25a03c94953caa879c8f68c894809393ebaa833

    // let an = BlsScalar([0, 0, 0, 0x00000000deadbeef]);
    // let bn = BlsScalar([0, 0, 0, 0x0000000012345678]);
    // hash output 59905e5df0785fc25412c3635e600c095366faa5696a391435fcd7c3bdba8513

    // let an = BlsScalar([0, 0, 0, 0x00000000efbeadde]);
    // let bn = BlsScalar([0, 0, 0, 0x0000000078563412]);
    // hash output 50447473aaf7f3d32b9e79270b9bd893593e58b5fc04d723e4f1e05d636c614a

    // let an = BlsScalar([0, 0, 0, 0xefbeadde00000000]);
    // let bn = BlsScalar([0, 0, 0, 0x7856341200000000]);
    // hash output 69eb112f5da4c5d0e0f4316144c4cbf71fba2495325238c73140429d5a101240

    let an = BlsScalar([0, 0, 0, 0xdeadbeef00000000]);
    let bn = BlsScalar([0, 0, 0, 0x1234567800000000]);
    // hash output dcef662231c3c22b4b89ca78cca517b1aee17d50ec7c199cb21dbf96e9673d59

    log(format!("Rust an: {:?}", an).as_str());

    // let br: [u8; 64] = b8.try_into().unwrap();
    // let bn: BlsScalar = BlsScalar::from_bytes_wide(&br);
    // let bn: BlsScalar = from_hex(b).into();
    // let bn: BlsScalar = BlsScalar([0, 0 ,0,from_hex(b)]);

    log(format!("Rust bn: {:?}", bn).as_str());

    let xn = hash(&[an, bn]);
    log(format!("Rust xn: {:?}", xn).as_str());

    format!("{:?}", xn)
    // log(hex::encode(u64_to_u8(xn.0)).as_str());
    // hex::encode(u64_to_u8(xn.0))
}
