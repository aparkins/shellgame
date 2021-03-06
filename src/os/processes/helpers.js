function loadStr(memory, ptr) {
    let memBuf = new Uint8Array(memory.wasmMemory.buffer);

    let endPtr = ptr;
    for (; memBuf[endPtr] != 0; endPtr++) { }

    let strBytes = memBuf.slice(ptr, endPtr);
    let decoder = new TextDecoder();
    return decoder.decode(strBytes);
}

function writeStr(memory, str) {
    let encoder = new TextEncoder();
    let bytes  = encoder.encode(str + '\0');
    let buf = memory.alloc(bytes.byteLength);
    memory.memcopy_safe(bytes, buf);
    return buf;
}

export {
    loadStr,
    writeStr,
}
