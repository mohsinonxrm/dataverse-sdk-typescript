/**
 * Request body handling. The SDK JSON-serialises plain objects and arrays, and passes every other
 * body type to `fetch` unchanged, so callers can send exact bytes: a raw JSON string, a multipart
 * `$batch` body, XML, or binary file content.
 */

/** Body types that `fetch` accepts as-is. */
export type RawBody =
  string | Blob | ArrayBuffer | ArrayBufferView | FormData | URLSearchParams | ReadableStream;

const has = (name: string): boolean =>
  typeof (globalThis as Record<string, unknown>)[name] === "function";

/** True for bodies that go to `fetch` unchanged (anything except plain objects, arrays and primitives other than string). */
export function isRawBody(body: unknown): body is RawBody {
  if (typeof body === "string") return true;
  if (typeof body !== "object" || body === null) return false;
  if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) return true;
  if (has("Blob") && body instanceof Blob) return true;
  if (has("FormData") && body instanceof FormData) return true;
  if (has("URLSearchParams") && body instanceof URLSearchParams) return true;
  if (has("ReadableStream") && body instanceof ReadableStream) return true;
  return false;
}

/** True when the SDK serialises the body to JSON itself. */
export function isJsonBody(body: unknown): boolean {
  return body !== undefined && body !== null && !isRawBody(body);
}

/** True for stream bodies, which can be read only once: they can't be retried and need `duplex: "half"`. */
export function isStreamBody(body: unknown): body is ReadableStream {
  return has("ReadableStream") && body instanceof ReadableStream;
}

/** Convert a request body to what `fetch` receives. */
export function toFetchBody(body: unknown): BodyInit | undefined {
  if (body === undefined || body === null) return undefined;
  if (ArrayBuffer.isView(body) && !(body instanceof Uint8Array)) {
    // Send exactly the view's bytes, never the whole underlying buffer.
    // TS types a view over ArrayBufferLike (which includes SharedArrayBuffer) as not a BodyInit;
    // fetch accepts any ArrayBufferView at runtime.
    return new Uint8Array(body.buffer, body.byteOffset, body.byteLength) as BodyInit;
  }
  if (isRawBody(body)) return body as BodyInit;
  return JSON.stringify(body);
}
