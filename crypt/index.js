import { PrivateKey, encrypt as encr, decrypt as decr } from "eciesjs";

function utf8String(data) {
    return [...(new TextEncoder()).encode(data)].map(v => String.fromCharCode(v)).join("")
}

function decodeString(data) {
    return (new TextDecoder()).decode(data);
}

function bytesToB64(data) {
    return btoa([...data].map(v => String.fromCharCode(v)).join(""));
}

function bufferFromB64(data) {
    let d = atob(data);
    let buffer = Uint8Array.from([...d].map(v => v.charCodeAt(0)));
    return buffer
}

function decrypt(data, key) {
    return decodeString(decr(bufferFromB64(key), bufferFromB64(data)));
}

function encrypt(data, key) {
    return bytesToB64(encr(bufferFromB64(key), (new TextEncoder()).encode(data)));
}

function generateKeys() {
    let key = new PrivateKey();
    return [bytesToB64(key.secret), bytesToB64(key.publicKey.toBytes())]
}

export {decrypt, encrypt, generateKeys, utf8String, decodeString, bytesToB64, PrivateKey};