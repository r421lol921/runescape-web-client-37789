/**
 * Pure TypeScript implementations of the Rust/WASM functions.
 * These replace the wasm/src/lib.rs imports that required a compiled WASM binary.
 */

import bigInt from "big-integer";

export function rs_hash_string(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    // Match Rust Wrapping<i32>: multiply, add charCode, subtract 32, truncate to 32-bit signed
    hash = ((Math.imul(hash, 61) + s.charCodeAt(i)) - 32) | 0;
  }
  return hash;
}

export function noise(x: number, y: number): number {
  let n = (x + y * 57) | 0;
  n ^= n << 13;
  // Match Rust Wrapping<i32> arithmetic, then extract result
  const a = Math.imul(Math.imul(n, n), 15731);
  const b = (a + 789221) | 0;
  const c = (Math.imul(n, b) + 1376312589) | 0;
  return ((c & 0x7fffffff) >>> 19) & 255;
}

export function rs_encrypt_bytes(
  bytes: Int8Array,
  modulus: string,
  publicKey: string
): Uint8Array {
  // Build the value as a big-integer from signed bytes (big-endian)
  let value = bigInt(0);
  for (let i = 0; i < bytes.length; i++) {
    value = value.shiftLeft(8).or(bigInt(bytes[i] & 0xff));
  }

  const mod = bigInt(modulus);
  const exp = bigInt(publicKey);
  const result = value.modPow(exp, mod);

  // Convert back to big-endian byte array
  let hex = result.toString(16);
  if (hex.length % 2 !== 0) hex = "0" + hex;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}
