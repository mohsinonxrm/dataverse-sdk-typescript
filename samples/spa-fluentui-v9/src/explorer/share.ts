/**
 * A request in the explorer as a link: `/explorer#r=<payload>`. The payload is compact JSON with a
 * version field, compressed with `CompressionStream("deflate-raw")` when the browser has it, and
 * base64url-encoded. It lives in the URL fragment, which browsers never send to a server.
 *
 * What a link holds: the method, the URL relative to the Web API root, the headers that aren't
 * secrets and the body of a raw request; or the kind, name, arguments, parameters and code style
 * of a typed operation; and the environment URL only when the visitor asks for it. Never the
 * access token, an `Authorization`, `Cookie` or other secret header.
 *
 * A link is someone else's request: `decodeShare()` treats it as untrusted input. It checks the
 * size before and after decompression, the version, every field's type and size, drops secret
 * headers, refuses absolute URLs, and throws a `ShareError` that says what is wrong.
 */
import { validateEnvironmentUrl } from "../config";
import { relativePath } from "./rawRequest";
import {
  HTTP_METHODS,
  OPERATION_KINDS,
  type CodeFlavour,
  type HttpMethod,
  type OperationInput,
  type OperationKind,
  type RawRequestInput,
} from "./types";

/** The payload format's version. A link of another version is refused, not guessed at. */
export const SHARE_VERSION = 1;
/** The longest payload (the text after `#r=`) a link may have: 16 KB. */
export const MAX_LINK_LENGTH = 16 * 1024;
/** The most JSON a payload may decompress to: 64 KB. */
export const MAX_JSON_BYTES = 64 * 1024;
/** The most arguments or parameters an operation in a link may have. */
const MAX_FIELDS = 200;

const FLAVOURS: readonly CodeFlavour[] = ["typed", "service", "fluent"];

/** A request to share, or one read from a link. */
export type SharedRequest = {
  /** The environment it was shared from; only when the visitor chose to include it. */
  environmentUrl?: string;
} & (
  | { type: "raw"; request: RawRequestInput }
  | {
      type: "operation";
      operation: { kind: OperationKind; name: string };
      input: OperationInput;
      flavour?: CodeFlavour;
    }
);

/** A link that can't be opened (or a request that can't be shared), and why. */
export class ShareError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShareError";
  }
}

/** The JSON in a link, version 1. Short keys keep links short. */
type Payload = { v: number; e?: string } & (
  | { t: "raw"; m: string; u: string; h?: string; b?: string }
  | {
      t: "op";
      k: string;
      n: string;
      a?: Record<string, string>;
      p?: Record<string, string>;
      f?: string;
    }
);

const SECRET_HEADERS = new Set([
  "authorization",
  "proxy-authorization",
  "cookie",
  "set-cookie",
  "x-ms-authorization-auxiliary",
]);
const SECRET_NAME = /token|secret|password|passwd|api-?key|subscription-key|session|credential/i;

/** A header that carries a credential: never shared, never copied. */
export function isSecretHeader(name: string): boolean {
  const lower = name.trim().toLowerCase();
  return SECRET_HEADERS.has(lower) || SECRET_NAME.test(lower);
}

/** `Name: value` lines without the secret headers (other lines, comments included, are kept). */
export function withoutSecretHeaders(text: string): string {
  return text
    .split(/\r?\n/)
    .filter((line) => {
      const colon = line.indexOf(":");
      return colon <= 0 || !isSecretHeader(line.slice(0, colon));
    })
    .join("\n")
    .trim();
}

/** The URL relative to the Web API root, without any scheme and host. */
function shareablePath(url: string, environmentUrl?: string): string {
  let path = relativePath(url, environmentUrl);
  if (/^[a-z][a-z\d+.-]*:/i.test(path) || path.startsWith("//")) {
    try {
      const parsed = new URL(path, "https://placeholder.invalid");
      path = relativePath(`${parsed.pathname}${parsed.search}`);
    } catch {
      path = "";
    }
  }
  return path;
}

// --- bytes, base64url and compression ---

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]*$/.test(text))
    throw new ShareError("The link is damaged: it isn't base64url.");
  const base64 = text.replace(/-/g, "+").replace(/_/g, "/");
  let binary: string;
  try {
    binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
  } catch {
    throw new ShareError("The link is damaged: it isn't base64url.");
  }
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** Whether this browser can compress links (`CompressionStream` with `deflate-raw`). */
export function canCompress(): boolean {
  try {
    return typeof CompressionStream === "function" && Boolean(new CompressionStream("deflate-raw"));
  } catch {
    return false;
  }
}

function streamOf(bytes: Uint8Array): ReadableStream<BufferSource> {
  return new Blob([bytes as Uint8Array<ArrayBuffer>]).stream();
}

async function deflate(bytes: Uint8Array): Promise<Uint8Array> {
  const stream = streamOf(bytes).pipeThrough(new CompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

/** Decompresses, stopping as soon as the output passes `limit` bytes. */
async function inflate(bytes: Uint8Array, limit: number): Promise<Uint8Array> {
  if (typeof DecompressionStream !== "function") {
    throw new ShareError("This browser can't open compressed links: try a current browser.");
  }
  let reader: ReadableStreamDefaultReader<Uint8Array>;
  try {
    reader = streamOf(bytes).pipeThrough(new DecompressionStream("deflate-raw")).getReader();
  } catch {
    throw new ShareError("This browser can't open compressed links: try a current browser.");
  }
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > limit) {
        void reader.cancel().catch(() => undefined);
        throw new ShareError(`The shared request is too large: over ${limit / 1024} KB.`);
      }
      chunks.push(value);
    }
  } catch (error) {
    if (error instanceof ShareError) throw error;
    throw new ShareError("The link is damaged: it doesn't decompress.");
  }
  const out = new Uint8Array(total);
  let at = 0;
  for (const chunk of chunks) {
    out.set(chunk, at);
    at += chunk.byteLength;
  }
  return out;
}

// --- encode ---

/** Compressed payloads start `z.`, uncompressed ones `j.` (`.` is not in base64url). */
const COMPRESSED = "z.";
const PLAIN = "j.";

function toPayload(shared: SharedRequest, environmentUrl?: string): Payload {
  const e = shared.environmentUrl ? { e: shared.environmentUrl } : {};
  if (shared.type === "raw") {
    const { method, url, headers, body } = shared.request;
    const h = withoutSecretHeaders(headers);
    return {
      v: SHARE_VERSION,
      t: "raw",
      m: method,
      u: shareablePath(url, environmentUrl),
      ...(h ? { h } : {}),
      ...(body.trim() ? { b: body } : {}),
      ...e,
    };
  }
  const nonEmpty = (values: Record<string, string>) => {
    const kept = Object.entries(values).filter(([, v]) => v !== "");
    return kept.length ? Object.fromEntries(kept) : undefined;
  };
  const a = nonEmpty(shared.input.args);
  const p = nonEmpty(shared.input.parameters);
  return {
    v: SHARE_VERSION,
    t: "op",
    k: shared.operation.kind,
    n: shared.operation.name,
    ...(a ? { a } : {}),
    ...(p ? { p } : {}),
    ...(shared.flavour ? { f: shared.flavour } : {}),
    ...e,
  };
}

export interface EncodeOptions {
  /** The environment in use: an absolute URL of it is made relative. */
  environmentUrl?: string;
  /** Include the environment URL in the link. Off by default. */
  includeEnvironment?: boolean;
  /** Compress when the browser can (default true). */
  compress?: boolean;
}

/**
 * The payload of a link for `shared` (the text after `#r=`): never a secret header, and the
 * environment only with `includeEnvironment`.
 * @throws ShareError when the link would be longer than 16 KB.
 */
export async function encodeShare(
  shared: SharedRequest,
  options: EncodeOptions = {}
): Promise<string> {
  const { environmentUrl, includeEnvironment = false, compress = true } = options;
  const environment = includeEnvironment ? (shared.environmentUrl ?? environmentUrl) : undefined;
  const payload = toPayload({ ...shared, environmentUrl: environment }, environmentUrl);
  const json = new TextEncoder().encode(JSON.stringify(payload));
  if (json.byteLength > MAX_JSON_BYTES) {
    throw new ShareError(
      `The request is too large to share as a link: ${Math.ceil(json.byteLength / 1024)} KB, over ${MAX_JSON_BYTES / 1024} KB.`
    );
  }
  let text = PLAIN + toBase64Url(json);
  if (compress && canCompress()) {
    const packed = COMPRESSED + toBase64Url(await deflate(json));
    if (packed.length < text.length) text = packed;
  }
  if (text.length > MAX_LINK_LENGTH) {
    throw new ShareError(
      `The request is too large to share as a link: ${Math.ceil(text.length / 1024)} KB, over ${MAX_LINK_LENGTH / 1024} KB.`
    );
  }
  return text;
}

/** The full link: `<origin>/explorer#r=<payload>`. */
export function shareLink(origin: string, payload: string): string {
  return `${origin}/explorer#r=${payload}`;
}

// --- decode ---

/** The payload of `#r=…` in a URL fragment, or `undefined` when there is none. */
export function sharePayload(hash: string): string | undefined {
  const text = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!text) return undefined;
  for (const part of text.split("&")) {
    if (part.startsWith("r=")) return part.slice(2);
  }
  return undefined;
}

/** Control characters other than tab and line breaks. */
const hasControl = (value: string) =>
  [...value].some((ch) => {
    const code = ch.charCodeAt(0);
    return (code < 0x20 && ch !== "\t" && ch !== "\n" && ch !== "\r") || code === 0x7f;
  });
/** An operation, argument or parameter name (never `__proto__` and the like). */
const NAME = /^[A-Za-z][\w.]{0,199}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, field: string, max: number, optional = true): string {
  if (value === undefined && optional) return "";
  if (typeof value !== "string") throw new ShareError(`The shared request's ${field} isn't text.`);
  if (value.length > max) throw new ShareError(`The shared request's ${field} is too long.`);
  return value;
}

function strings(value: unknown, field: string): Record<string, string> {
  if (value === undefined) return {};
  if (!isRecord(value))
    throw new ShareError(`The shared request's ${field} aren't a list of values.`);
  const entries = Object.entries(value);
  if (entries.length > MAX_FIELDS)
    throw new ShareError(`The shared request has too many ${field}.`);
  const out: Record<string, string> = {};
  for (const [name, v] of entries) {
    if (!NAME.test(name)) throw new ShareError(`The shared request has an invalid ${field} name.`);
    if (typeof v !== "string")
      throw new ShareError(`The shared request's ${field} "${name}" isn't text.`);
    out[name] = v;
  }
  return out;
}

const ALLOWED_KEYS = {
  raw: new Set(["v", "t", "e", "m", "u", "h", "b"]),
  op: new Set(["v", "t", "e", "k", "n", "a", "p", "f"]),
};

/** Checks the decoded JSON field by field: it came from someone else. */
function fromPayload(value: unknown): SharedRequest {
  if (!isRecord(value)) throw new ShareError("The link doesn't hold a request.");
  if (value.v !== SHARE_VERSION) {
    throw new ShareError(
      typeof value.v === "number" && value.v > SHARE_VERSION
        ? "The link was made by a newer version of the explorer."
        : "The link's format isn't one the explorer knows."
    );
  }
  if (value.t !== "raw" && value.t !== "op") {
    throw new ShareError("The link holds a kind of request the explorer doesn't know.");
  }
  const unknown = Object.keys(value).filter((k) => !ALLOWED_KEYS[value.t as "raw" | "op"].has(k));
  if (unknown.length)
    throw new ShareError(`The link has fields the explorer doesn't know: ${unknown.join(", ")}.`);

  let environmentUrl: string | undefined;
  if (value.e !== undefined) {
    const e = text(value.e, "environment", 300);
    if (validateEnvironmentUrl(e) !== undefined) {
      throw new ShareError("The link's environment isn't a Dataverse environment URL.");
    }
    environmentUrl = new URL(e).origin;
  }
  const env = environmentUrl ? { environmentUrl } : {};

  if (value.t === "raw") {
    const method = text(value.m, "method", 10, false).toUpperCase();
    if (!HTTP_METHODS.includes(method as HttpMethod)) {
      throw new ShareError(`The shared request's method "${method}" isn't one the explorer sends.`);
    }
    const url = text(value.u, "URL", 8 * 1024, false).trim();
    if (!url) throw new ShareError("The shared request has no URL.");
    if (hasControl(url) || /[\t\r\n]/.test(url))
      throw new ShareError("The shared request's URL has control characters.");
    if (/^[a-z][a-z\d+.-]*:/i.test(url) || url.startsWith("//")) {
      throw new ShareError("The shared request's URL must be relative to the Web API root.");
    }
    const headers = text(value.h, "headers", 8 * 1024);
    if (hasControl(headers))
      throw new ShareError("The shared request's headers have control characters.");
    const body = text(value.b, "body", MAX_JSON_BYTES);
    return {
      type: "raw",
      request: {
        method: method as HttpMethod,
        url: relativePath(url),
        headers: withoutSecretHeaders(headers),
        body,
      },
      ...env,
    };
  }

  const kind = text(value.k, "package", 20, false);
  if (!OPERATION_KINDS.includes(kind as OperationKind)) {
    throw new ShareError(`The shared request's package "${kind}" isn't one the explorer knows.`);
  }
  const name = text(value.n, "operation", 200, false);
  if (!NAME.test(name)) throw new ShareError("The shared request's operation name isn't valid.");
  let flavour: CodeFlavour | undefined;
  if (value.f !== undefined) {
    if (!FLAVOURS.includes(value.f as CodeFlavour)) {
      throw new ShareError("The shared request's code style isn't one the explorer knows.");
    }
    flavour = value.f as CodeFlavour;
  }
  return {
    type: "operation",
    operation: { kind: kind as OperationKind, name },
    input: { args: strings(value.a, "arguments"), parameters: strings(value.p, "parameters") },
    ...(flavour ? { flavour } : {}),
    ...env,
  };
}

/**
 * The request in a link's payload (the text after `#r=`).
 * @throws ShareError for a payload that is too large, damaged, of an unknown version, or with a
 * field that is missing, of the wrong type or too long.
 */
export async function decodeShare(payload: string): Promise<SharedRequest> {
  if (!payload) throw new ShareError("The link is empty.");
  if (payload.length > MAX_LINK_LENGTH) {
    throw new ShareError(`The link is too long: over ${MAX_LINK_LENGTH / 1024} KB.`);
  }
  const prefix = payload.slice(0, 2);
  if (prefix !== COMPRESSED && prefix !== PLAIN) {
    throw new ShareError("The link's format isn't one the explorer knows.");
  }
  const bytes = fromBase64Url(payload.slice(2));
  const json = prefix === COMPRESSED ? await inflate(bytes, MAX_JSON_BYTES) : bytes;
  if (json.byteLength > MAX_JSON_BYTES) {
    throw new ShareError(`The shared request is too large: over ${MAX_JSON_BYTES / 1024} KB.`);
  }
  let value: unknown;
  try {
    value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(json));
  } catch {
    throw new ShareError("The link is damaged: it doesn't hold valid JSON.");
  }
  return fromPayload(value);
}

/** What in a shared request deserves a warning before it runs. */
export function sharedRequestRisks(
  shared: SharedRequest,
  method: string
): { changesData: boolean; impersonates: boolean } {
  const impersonates =
    shared.type === "raw" &&
    /^\s*(mscrmcallerid|callerobjectid)\s*:/im.test(shared.request.headers);
  return { changesData: method.toUpperCase() !== "GET", impersonates };
}
