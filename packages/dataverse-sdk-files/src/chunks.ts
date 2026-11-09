/** What `upload()` accepts as the file. */
export type FileSource = Blob | ArrayBuffer | ArrayBufferView | ReadableStream<Uint8Array>;

/** One piece of the file, and whether it is the last. */
export interface Chunk {
  bytes: Uint8Array;
  last: boolean;
}

export function isBlob(value: unknown): value is Blob {
  return typeof Blob !== "undefined" && value instanceof Blob;
}

export function isReadableStream(value: unknown): value is ReadableStream<Uint8Array> {
  return typeof ReadableStream !== "undefined" && value instanceof ReadableStream;
}

/** Size in bytes of a source whose size is known (not a stream). */
export function knownSize(file: FileSource): number | undefined {
  if (file instanceof ArrayBuffer || ArrayBuffer.isView(file)) return file.byteLength;
  if (isBlob(file)) return file.size;
  return undefined;
}

function concat(parts: Uint8Array[], length: number): Uint8Array {
  if (parts.length === 1 && parts[0]) return parts[0];
  const out = new Uint8Array(length);
  let at = 0;
  for (const part of parts) {
    out.set(part, at);
    at += part.byteLength;
  }
  return out;
}

/** Pieces of exactly `chunkSize` bytes (the last may be shorter) from a stream. */
async function* streamPieces(
  stream: ReadableStream<Uint8Array>,
  chunkSize: number
): AsyncGenerator<Uint8Array> {
  const reader = stream.getReader();
  let finished = false;
  try {
    let parts: Uint8Array[] = [];
    let length = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!ArrayBuffer.isView(value))
        throw new TypeError("the stream must yield Uint8Array chunks");
      parts.push(new Uint8Array(value.buffer, value.byteOffset, value.byteLength));
      length += value.byteLength;
      while (length >= chunkSize) {
        const joined = concat(parts, length);
        yield joined.subarray(0, chunkSize);
        const rest = joined.subarray(chunkSize);
        parts = rest.byteLength > 0 ? [rest] : [];
        length = rest.byteLength;
      }
    }
    finished = true;
    if (length > 0) yield concat(parts, length);
  } finally {
    if (!finished) await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}

/** Pieces of `chunkSize` bytes from any source, reading a `Blob` one slice at a time. */
async function* pieces(file: FileSource, chunkSize: number): AsyncGenerator<Uint8Array> {
  if (isReadableStream(file)) {
    yield* streamPieces(file, chunkSize);
  } else if (isBlob(file)) {
    for (let start = 0; start < file.size; start += chunkSize) {
      yield new Uint8Array(await file.slice(start, start + chunkSize).arrayBuffer());
    }
  } else if (file instanceof ArrayBuffer || ArrayBuffer.isView(file)) {
    const bytes =
      file instanceof ArrayBuffer
        ? new Uint8Array(file)
        : new Uint8Array(file.buffer, file.byteOffset, file.byteLength);
    for (let start = 0; start < bytes.byteLength; start += chunkSize) {
      yield bytes.subarray(start, start + chunkSize);
    }
  } else {
    throw new TypeError(
      "file must be a Blob, an ArrayBuffer, a typed array such as Uint8Array, or a ReadableStream"
    );
  }
}

/**
 * The chunks of a file, each marked when it is the last (one chunk is read ahead to know).
 * Stops reading the source when the consumer stops.
 */
export async function* chunksOf(file: FileSource, chunkSize: number): AsyncGenerator<Chunk> {
  const source = pieces(file, chunkSize);
  try {
    let current = await source.next();
    if (current.done) return;
    for (;;) {
      const next = await source.next();
      if (next.done) {
        yield { bytes: current.value, last: true };
        return;
      }
      yield { bytes: current.value, last: false };
      current = next;
    }
  } finally {
    await source.return(undefined);
  }
}

/** All the bytes of a source in one array (for the single-request route). */
export async function allBytes(file: FileSource): Promise<Uint8Array> {
  if (file instanceof ArrayBuffer) return new Uint8Array(file);
  if (ArrayBuffer.isView(file))
    return new Uint8Array(file.buffer, file.byteOffset, file.byteLength);
  if (isBlob(file)) return new Uint8Array(await file.arrayBuffer());
  const parts: Uint8Array[] = [];
  let length = 0;
  for await (const { bytes } of chunksOf(file, 1024 * 1024)) {
    parts.push(bytes);
    length += bytes.byteLength;
  }
  return length === 0 ? new Uint8Array(0) : concat(parts, length);
}

/** Base64 without Node's `Buffer`: `btoa` exists in browsers and in Node.js. */
export function bytesToBase64(bytes: Uint8Array): string {
  // String.fromCharCode in slices: one call per byte is slow, one call for 4 MB overflows the stack.
  const SLICE = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += SLICE) {
    binary += String.fromCharCode(...bytes.subarray(i, i + SLICE));
  }
  return btoa(binary);
}

/** The bytes of a base64 string, without Node's `Buffer`. */
export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}
