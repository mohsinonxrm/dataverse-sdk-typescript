/**
 * @fileoverview Middleware utilities inspired by msgraph-sdk-javascript
 * Provides helpers for header manipulation, UUID generation, and content serialization
 */

import { toFetchBody } from "./body.js";

/**
 * Supported header formats:
 * 1. Headers object (standard Web API)
 * 2. Array of [key, value] tuples
 * 3. Plain object { key: value }
 */
export type HeadersLike = Headers | Array<[string, string]> | Record<string, string>;

/**
 * Get a header value from a request, supporting multiple header formats
 *
 * @param headers - The headers in any supported format
 * @param key - The header key to retrieve
 * @returns The header value or undefined
 *
 * @example
 * ```typescript
 * const value = getRequestHeader(new Headers({'Content-Type': 'application/json'}), 'Content-Type');
 * const value2 = getRequestHeader([['Content-Type', 'application/json']], 'Content-Type');
 * const value3 = getRequestHeader({ 'Content-Type': 'application/json' }, 'Content-Type');
 * ```
 */
export function getRequestHeader(
  headers: HeadersLike | undefined,
  key: string
): string | undefined {
  if (!headers) {
    return undefined;
  }

  if (headers instanceof Headers) {
    return headers.get(key) ?? undefined;
  }

  if (Array.isArray(headers)) {
    const header = headers.find(([k]) => k.toLowerCase() === key.toLowerCase());
    return header ? header[1] : undefined;
  }

  // Plain object
  const objectKey = Object.keys(headers).find((k) => k.toLowerCase() === key.toLowerCase());
  return objectKey ? headers[objectKey] : undefined;
}

/**
 * Set a header value, supporting multiple header formats
 *
 * @param headers - The headers in any supported format
 * @param key - The header key to set
 * @param value - The header value to set
 * @returns Updated headers in the same format as input
 *
 * @example
 * ```typescript
 * const headers = new Headers();
 * setRequestHeader(headers, 'Content-Type', 'application/json');
 * ```
 */
export function setRequestHeader(headers: HeadersLike, key: string, value: string): HeadersLike {
  if (headers instanceof Headers) {
    headers.set(key, value);
    return headers;
  }

  if (Array.isArray(headers)) {
    const existingIndex = headers.findIndex(([k]) => k.toLowerCase() === key.toLowerCase());
    if (existingIndex >= 0) {
      headers[existingIndex] = [key, value];
    } else {
      headers.push([key, value]);
    }
    return headers;
  }

  // Plain object - find existing key (case-insensitive) or add new
  const existingKey = Object.keys(headers).find((k) => k.toLowerCase() === key.toLowerCase());
  if (existingKey) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete headers[existingKey];
  }
  headers[key] = value;
  return headers;
}

/**
 * Append a header value (for multi-value headers like Accept, Cache-Control)
 *
 * @param headers - The headers in any supported format
 * @param key - The header key to append to
 * @param value - The header value to append
 * @returns Updated headers in the same format as input
 *
 * @example
 * ```typescript
 * const headers = new Headers({ 'Cache-Control': 'no-cache' });
 * appendRequestHeader(headers, 'Cache-Control', 'no-store');
 * // Result: Cache-Control: no-cache, no-store
 * ```
 */
export function appendRequestHeader(headers: HeadersLike, key: string, value: string): HeadersLike {
  if (headers instanceof Headers) {
    const existing = headers.get(key);
    if (existing) {
      headers.set(key, `${existing}, ${value}`);
    } else {
      headers.set(key, value);
    }
    return headers;
  }

  if (Array.isArray(headers)) {
    const existingIndex = headers.findIndex(([k]) => k.toLowerCase() === key.toLowerCase());
    if (existingIndex >= 0) {
      headers[existingIndex][1] = `${headers[existingIndex][1]}, ${value}`;
    } else {
      headers.push([key, value]);
    }
    return headers;
  }

  // Plain object
  const existingKey = Object.keys(headers).find((k) => k.toLowerCase() === key.toLowerCase());
  if (existingKey) {
    headers[existingKey] = `${headers[existingKey]}, ${value}`;
  } else {
    headers[key] = value;
  }
  return headers;
}

/**
 * Generate a UUID v4 for request tracking
 *
 * @returns A UUID string
 *
 * @example
 * ```typescript
 * const requestId = generateUUID();
 * // Result: "550e8400-e29b-41d4-a716-446655440000"
 * ```
 */
export function generateUUID(): string {
  // Use crypto.randomUUID if available (Node 18.17+, all modern browsers)
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback implementation
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Serialize content for HTTP request body
 * Handles various types and ensures compatibility between Node and browser
 *
 * @param content - The content to serialize
 * @returns Serialized content ready for fetch body: JSON for plain objects and arrays,
 *   everything else unchanged (a typed-array view as a `Uint8Array` over exactly its bytes)
 * @throws When a plain object can't be serialised (e.g. a circular reference)
 *
 * @example
 * ```typescript
 * const body = serializeContent({ name: 'Account', revenue: 1000000 });
 * // Result: '{"name":"Account","revenue":1000000}'
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeContent(content: unknown): BodyInit {
  if (content === null || content === undefined) {
    return "";
  }
  // Same rules as the client's own request bodies: raw bodies (string, Blob, FormData,
  // URLSearchParams, streams, ArrayBuffer and typed-array views) go as-is, and a view sends only
  // its own bytes (byteOffset/byteLength), never the rest of the underlying buffer (#34).
  const body = toFetchBody(content);
  if (body !== undefined) return body;
  return "";
}

/**
 * Parse a `Retry-After` header value: delta-seconds (decimals allowed, e.g. `"1.5"`) or an
 * HTTP-date. A date in the past gives 0.
 *
 * @param retryAfter - The Retry-After header value
 * @returns Delay in milliseconds, or undefined if the value is missing or invalid
 *
 * @example
 * ```typescript
 * const delay1 = parseRetryAfter('120'); // 120000 ms (120 seconds)
 * const delay2 = parseRetryAfter('1.5'); // 1500 ms
 * const delay3 = parseRetryAfter('Wed, 21 Oct 2015 07:28:00 GMT'); // milliseconds until that time
 * ```
 */
export function parseRetryAfter(retryAfter: string | null | undefined): number | undefined {
  const value = retryAfter?.trim();
  if (!value) {
    return undefined;
  }

  if (/^\d+(\.\d+)?$/.test(value)) {
    return Math.round(Number(value) * 1000);
  }

  // An HTTP-date always names the day; this keeps strings like "-5" or "12abc" out of Date.parse.
  if (/[a-z]/i.test(value)) {
    const date = Date.parse(value);
    if (!Number.isNaN(date)) {
      return Math.max(0, date - Date.now());
    }
  }

  return undefined;
}

/**
 * Convert Headers object to plain object for logging/debugging
 *
 * @param headers - Headers instance
 * @returns Plain object representation
 *
 * @example
 * ```typescript
 * const headers = new Headers({ 'Content-Type': 'application/json' });
 * const obj = headersToObject(headers);
 * // Result: { 'content-type': 'application/json' }
 * ```
 */
export function headersToObject(headers: Headers): Record<string, string> {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

/**
 * Normalize header key to lowercase for consistent comparison
 *
 * @param key - The header key
 * @returns Lowercase header key
 */
export function normalizeHeaderKey(key: string): string {
  return key.toLowerCase();
}

/**
 * Return a copy of `headers` with every name lower-cased. When two names differ only in case,
 * the one that comes later in the object wins, so spreading caller headers after defaults keeps
 * the caller's value. `fetch` would otherwise combine `Content-Type` and `content-type` into one
 * comma-separated value.
 *
 * @example
 * ```typescript
 * normalizeHeaders({ "Content-Type": "a", "content-type": "b" }); // { "content-type": "b" }
 * ```
 */
export function normalizeHeaders(
  headers: Record<string, string> | undefined
): Record<string, string> {
  const out: Record<string, string> = {};
  if (!headers) return out;
  for (const [key, value] of Object.entries(headers)) out[key.toLowerCase()] = value;
  return out;
}

/**
 * Check if response is a stream/binary content that should not be retried
 *
 * @param contentType - Content-Type header value
 * @returns True if content is binary/stream
 *
 * @example
 * ```typescript
 * const isStream = isStreamContent('application/octet-stream'); // true
 * const isJson = isStreamContent('application/json'); // false
 * ```
 */
export function isStreamContent(contentType: string | null | undefined): boolean {
  if (!contentType) {
    return false;
  }

  const streamTypes = ["application/octet-stream", "application/pdf", "image/", "video/", "audio/"];

  const lowerContentType = contentType.toLowerCase();
  return streamTypes.some((type) => lowerContentType.includes(type));
}
