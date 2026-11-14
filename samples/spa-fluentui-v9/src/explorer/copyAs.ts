/**
 * The explorer's request as code without the SDK: a curl command (bash), JavaScript `fetch`, or C#
 * `HttpClient`. Each is written from the request the SDK builds (preview.ts): its full URL, and
 * the headers it sends (`Accept`, `OData-MaxVersion`, `OData-Version`, `Content-Type`, `Prefer`,
 * `If-Match`, …), without its own telemetry headers. The access token is always the `<TOKEN>`
 * placeholder: an `Authorization`, `Cookie` or other secret header in the input is dropped, never
 * copied.
 */
import { tsLiteral } from "./codegen";
import { isSecretHeader } from "./share";

export type CopyAsFormat = "curl" | "fetch" | "csharp";

export const COPY_AS_FORMATS: ReadonlyArray<{ value: CopyAsFormat; label: string }> = [
  { value: "curl", label: "curl (bash)" },
  { value: "fetch", label: "fetch (JavaScript)" },
  { value: "csharp", label: "C# HttpClient" },
];

/** A request as the SDK sends it. */
export interface CopyAsRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
}

export const TOKEN_PLACEHOLDER = "<TOKEN>";
/** The environment of the demo, which is not a real one. */
export const ORG_PLACEHOLDER = "https://<org>.crm.dynamics.com";

/** The usual spelling of the headers the SDK sends (fetch's `Headers` lowercases them). */
const CANONICAL: Record<string, string> = {
  accept: "Accept",
  "content-type": "Content-Type",
  "odata-maxversion": "OData-MaxVersion",
  "odata-version": "OData-Version",
  prefer: "Prefer",
  "if-match": "If-Match",
  "if-none-match": "If-None-Match",
  mscrmcallerid: "MSCRMCallerID",
  callerobjectid: "CallerObjectId",
  consistency: "Consistency",
};
const ORDER = Object.keys(CANONICAL);

/** The SDK's own telemetry and tracing headers: not part of the request a reader needs. */
const SDK_ONLY = new Set([
  "x-ms-sdk-version",
  "x-ms-feature-usage",
  "x-ms-client-request-id",
  "x-ms-correlation-id",
  "client-request-id",
  "retry-attempt",
  "traceparent",
  "tracestate",
  "user-agent",
  "x-ms-useragent",
]);

/** `request` with its origin replaced by `origin` (the demo's placeholder). */
export function withOrigin(request: CopyAsRequest, origin: string): CopyAsRequest {
  const url = new URL(request.url);
  return { ...request, url: `${origin}${url.pathname}${url.search}` };
}

/**
 * The headers to write, in a stable order: `Authorization: Bearer <TOKEN>` first, then the OData
 * headers, then the rest. Secret headers are dropped; `Content-Type` only with a body.
 */
export function copyHeaders(request: CopyAsRequest): Array<[string, string]> {
  const kept = Object.entries(request.headers)
    .filter(([name]) => !isSecretHeader(name) && !SDK_ONLY.has(name.toLowerCase()))
    .filter(([name]) => request.body !== undefined || name.toLowerCase() !== "content-type")
    .map(([name, value]): [string, string] => [CANONICAL[name.toLowerCase()] ?? name, value]);
  const rank = (name: string) => {
    const i = ORDER.indexOf(name.toLowerCase());
    return i < 0 ? ORDER.length : i;
  };
  kept.sort((a, b) => rank(a[0]) - rank(b[0]));
  return [["Authorization", `Bearer ${TOKEN_PLACEHOLDER}`], ...kept];
}

/** The body as JSON, pretty-printed, or `undefined` when it isn't JSON. */
function parsedBody(body: string | undefined): { value: unknown; text: string } | undefined {
  if (body === undefined) return undefined;
  try {
    const value: unknown = JSON.parse(body);
    return { value, text: JSON.stringify(value, null, 2) };
  } catch {
    return undefined;
  }
}

// --- curl ---

/** `text` as one bash word in single quotes: `'` becomes `'\''`. */
export function shellQuote(text: string): string {
  return `'${text.replace(/'/g, `'\\''`)}'`;
}

export function toCurl(request: CopyAsRequest): string {
  const method = request.method.toUpperCase();
  const parts: string[] = [];
  // curl reads [] and {} in a URL as globs.
  const glob = /[[\]{}]/.test(request.url) ? " --globoff" : "";
  parts.push(`curl${method === "GET" ? "" : ` -X ${method}`}${glob} ${shellQuote(request.url)}`);
  for (const [name, value] of copyHeaders(request))
    parts.push(`-H ${shellQuote(`${name}: ${value}`)}`);
  if (request.body !== undefined) {
    parts.push(`--data-raw ${shellQuote(parsedBody(request.body)?.text ?? request.body)}`);
  }
  return parts.join(" \\\n  ");
}

// --- fetch ---

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;

export function toFetch(request: CopyAsRequest, name = "response"): string {
  const method = request.method.toUpperCase();
  const lines = [`const ${name} = await fetch(${JSON.stringify(request.url)}, {`];
  lines.push(`  method: ${JSON.stringify(method)},`);
  lines.push("  headers: {");
  for (const [header, value] of copyHeaders(request)) {
    const key = IDENTIFIER.test(header) ? header : JSON.stringify(header);
    lines.push(`    ${key}: ${JSON.stringify(value)},`);
  }
  lines.push("  },");
  if (request.body !== undefined) {
    const json = parsedBody(request.body);
    lines.push(
      json
        ? `  body: JSON.stringify(${tsLiteral(json.value, 1)}),`
        : `  body: ${JSON.stringify(request.body)},`
    );
  }
  lines.push("});");
  lines.push(`console.log(${name}.status, await ${name}.text());`);
  return lines.join("\n");
}

// --- C# ---

/** `text` as a C# regular string literal. */
export function csharpString(text: string): string {
  let out = '"';
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    if (ch === "\\") out += "\\\\";
    else if (ch === '"') out += '\\"';
    else if (ch === "\n") out += "\\n";
    else if (ch === "\r") out += "\\r";
    else if (ch === "\t") out += "\\t";
    else if (code < 0x20 || code === 0x7f || code === 0x2028 || code === 0x2029)
      out += `\\u${code.toString(16).padStart(4, "0")}`;
    else out += ch;
  }
  return `${out}"`;
}

/**
 * Multi-line `text` as a C# 11 raw string literal, indented by `indent`: the quotes around it are
 * one more than the longest run of quotes in it, at least three.
 */
export function csharpRawString(text: string, indent: string): string {
  const longest = Math.max(0, ...[...text.matchAll(/"+/g)].map((m) => m[0].length));
  const quotes = '"'.repeat(Math.max(3, longest + 1));
  const body = text
    .split("\n")
    .map((line) => (line ? `${indent}${line}` : line))
    .join("\n");
  return `${quotes}\n${body}\n${indent}${quotes}`;
}

const CSHARP_METHODS: Record<string, string> = {
  GET: "HttpMethod.Get",
  POST: "HttpMethod.Post",
  PUT: "HttpMethod.Put",
  PATCH: "HttpMethod.Patch",
  DELETE: "HttpMethod.Delete",
};

export function toCSharp(request: CopyAsRequest, suffix = ""): string {
  const method = request.method.toUpperCase();
  const req = `request${suffix}`;
  const res = `response${suffix}`;
  const lines = [
    `using var ${req} = new HttpRequestMessage(${CSHARP_METHODS[method] ?? `new HttpMethod(${csharpString(method)})`}, ${csharpString(request.url)});`,
  ];
  let contentType: string | undefined;
  for (const [name, value] of copyHeaders(request)) {
    if (name === "Authorization") {
      lines.push(
        `${req}.Headers.Authorization = new AuthenticationHeaderValue("Bearer", ${csharpString(TOKEN_PLACEHOLDER)});`
      );
    } else if (name.toLowerCase() === "content-type") {
      // A content header: set on the content, below.
      contentType = value;
    } else {
      lines.push(
        `${req}.Headers.TryAddWithoutValidation(${csharpString(name)}, ${csharpString(value)});`
      );
    }
  }
  if (request.body !== undefined) {
    const json = parsedBody(request.body);
    const literal =
      json && json.text.includes("\n")
        ? csharpRawString(json.text, "    ")
        : csharpString(json?.text ?? request.body);
    lines.push(
      literal.includes("\n")
        ? `${req}.Content = new StringContent(\n    ${literal});`
        : `${req}.Content = new StringContent(${literal});`
    );
    if (contentType) {
      lines.push(
        `${req}.Content.Headers.ContentType = MediaTypeHeaderValue.Parse(${csharpString(contentType)});`
      );
    }
  }
  lines.push(`using var ${res} = await client.SendAsync(${req});`);
  lines.push(
    `Console.WriteLine($"{(int)${res}.StatusCode} {await ${res}.Content.ReadAsStringAsync()}");`
  );
  return lines.join("\n");
}

const CSHARP_HEADER = [
  "using System.Net.Http;",
  "using System.Net.Http.Headers;",
  "",
  "using var client = new HttpClient();",
].join("\n");

/**
 * The requests in `format`. Several requests (an operation that sends more than one) are written
 * one after another, numbered.
 */
export function copyAs(format: CopyAsFormat, requests: readonly CopyAsRequest[]): string {
  const many = requests.length > 1;
  const note = (i: number, comment: string) =>
    many ? `${comment} Request ${i + 1} of ${requests.length}\n` : "";
  switch (format) {
    case "curl":
      return requests.map((r, i) => note(i, "#") + toCurl(r)).join("\n\n");
    case "fetch":
      return requests
        .map((r, i) => note(i, "//") + toFetch(r, many ? `response${i + 1}` : "response"))
        .join("\n\n");
    case "csharp":
      return [
        CSHARP_HEADER,
        ...requests.map((r, i) => note(i, "//") + toCSharp(r, many ? String(i + 1) : "")),
      ].join("\n\n");
  }
}
