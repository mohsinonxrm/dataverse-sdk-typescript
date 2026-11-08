/**
 * A raw Web API request, as typed in the request bar, turned into a `client.api()` chain: the
 * system query options become `select()`, `filter()`, `expand()`, `orderBy()`, `top()`, `count()`
 * and `apply()`, the headers the SDK has methods for become those methods, and the method picks
 * the terminal (`get()`, `post(body)`, …). `runRawPlan()` runs that chain and `rawCode()`
 * (codegen.ts) writes it, so the SDK code shown is the code that runs.
 */
import type { DataverseClient, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { HttpMethod, RawRequestInput } from "./types";

/** One call in the chain after `client.api(path)`. */
export type ChainCall =
  | { name: "select" | "orderBy" | "expand"; args: string[] }
  | { name: "filter" | "apply" | "preferRaw" | "ifMatch" | "ifNoneMatch"; args: [string] }
  | { name: "impersonate" | "impersonateByObjectId"; args: [string] }
  | { name: "top"; args: [number] }
  | { name: "count"; args: [] }
  | { name: "header"; args: [string, string] };

/** The terminal that sends the request. */
export type Terminal = "get" | "text" | "post" | "patch" | "put" | "delete";

export interface RawPlan {
  method: HttpMethod;
  /** Relative to the Web API root, with the query options that have no builder method. */
  path: string;
  calls: ChainCall[];
  terminal: Terminal;
  /** The parsed JSON body of a POST, PATCH or PUT. */
  body?: unknown;
}

export class RequestInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RequestInputError";
  }
}

/** Split `a,b(c,d),e` at top-level commas. */
function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of text) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      parts.push(current);
      current = "";
    } else current += ch;
  }
  parts.push(current);
  return parts.map((p) => p.trim()).filter(Boolean);
}

function decode(text: string): string {
  try {
    return decodeURIComponent(text.replace(/\+/g, " "));
  } catch {
    return text;
  }
}

/** The path relative to the Web API root: strips the environment URL and `/api/data/v9.x/`. */
export function relativePath(url: string, environmentUrl?: string): string {
  let path = url.trim();
  if (environmentUrl && path.toLowerCase().startsWith(environmentUrl.toLowerCase())) {
    path = path.slice(environmentUrl.length);
  }
  return path.replace(/^\/?api\/data\/v\d+\.\d+\/?/i, "").replace(/^\/+/, "");
}

/** `Name: value` lines (blank lines and `#` comments are skipped). */
export function parseHeaderLines(text: string): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const colon = line.indexOf(":");
    if (colon <= 0) throw new RequestInputError(`Header "${line}" has no "Name: value".`);
    out.push([line.slice(0, colon).trim(), line.slice(colon + 1).trim()]);
  }
  return out;
}

const SENDS_BODY: ReadonlySet<HttpMethod> = new Set(["POST", "PATCH", "PUT"]);

/**
 * The `client.api()` chain for a raw request.
 * @throws RequestInputError for an empty URL, a header without a colon, or a body that isn't JSON.
 */
export function parseRawRequest(input: RawRequestInput, environmentUrl?: string): RawPlan {
  const relative = relativePath(input.url, environmentUrl);
  if (!relative) throw new RequestInputError("Enter a URL, such as accounts?$top=3.");
  const at = relative.indexOf("?");
  const pathOnly = at < 0 ? relative : relative.slice(0, at);
  const query = at < 0 ? "" : relative.slice(at + 1);

  const calls: ChainCall[] = [];
  const rest: string[] = [];
  // An & starts the next option only where one follows (name=): an unencoded & inside a value,
  // as in $filter=name eq 'A&B', stays in it.
  for (const part of query.split(/&(?=[^&=]+=)/)) {
    if (!part) continue;
    const eq = part.indexOf("=");
    const name = decode(eq < 0 ? part : part.slice(0, eq));
    const value = eq < 0 ? "" : decode(part.slice(eq + 1));
    switch (name.toLowerCase()) {
      case "$select":
        calls.push({ name: "select", args: splitTopLevel(value) });
        break;
      case "$filter":
        calls.push({ name: "filter", args: [value] });
        break;
      case "$expand":
        calls.push({ name: "expand", args: splitTopLevel(value) });
        break;
      case "$orderby":
        calls.push({ name: "orderBy", args: splitTopLevel(value) });
        break;
      case "$apply":
        calls.push({ name: "apply", args: [value] });
        break;
      case "$top":
        if (/^\d+$/.test(value)) calls.push({ name: "top", args: [Number(value)] });
        else rest.push(part);
        break;
      case "$count":
        if (value === "true") calls.push({ name: "count", args: [] });
        else rest.push(part);
        break;
      default:
        rest.push(part);
    }
  }

  for (const [name, value] of parseHeaderLines(input.headers)) {
    switch (name.toLowerCase()) {
      case "prefer":
        calls.push({ name: "preferRaw", args: [value] });
        break;
      case "if-match":
        calls.push({ name: "ifMatch", args: [value] });
        break;
      case "if-none-match":
        calls.push({ name: "ifNoneMatch", args: [value] });
        break;
      case "mscrmcallerid":
        calls.push({ name: "impersonate", args: [value] });
        break;
      case "callerobjectid":
        calls.push({ name: "impersonateByObjectId", args: [value] });
        break;
      default:
        calls.push({ name: "header", args: [name, value] });
    }
  }

  let body: unknown;
  if (SENDS_BODY.has(input.method) && input.body.trim()) {
    try {
      body = JSON.parse(input.body);
    } catch (error) {
      throw new RequestInputError(
        `The body isn't valid JSON: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  const path = rest.length ? `${pathOnly}?${rest.join("&")}` : pathOnly;
  // $metadata and a column's $value aren't JSON: read them as text.
  const binary = /(^|\/)(\$metadata|\$value)$/.test(pathOnly);
  const terminal: Terminal =
    input.method === "GET" ? (binary ? "text" : "get") : (input.method.toLowerCase() as Terminal);
  return { method: input.method, path, calls, terminal, body };
}

const DEFAULT_HEADERS = new Set(["accept", "content-type", "odata-version", "odata-maxversion"]);

/**
 * The raw request an operation sends, from its `toRequestInformation()`: the route of the
 * "client.api()" flavour of a typed operation.
 */
export function rawInputFromRequestInformation(
  info: RequestInformation,
  apiRoot: string
): RawRequestInput {
  const url = info.url.startsWith(apiRoot)
    ? info.url.slice(apiRoot.length).replace(/^\/+/, "")
    : info.url;
  const query = Object.entries(info.query ?? {})
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`);
  const headers = Object.entries(info.headers)
    .filter(([name]) => !DEFAULT_HEADERS.has(name.toLowerCase()))
    .map(([name, value]) => `${name}: ${value}`)
    .join("\n");
  const body =
    info.body === undefined
      ? ""
      : typeof info.body === "string"
        ? info.body
        : JSON.stringify(info.body);
  return {
    method: info.method,
    url: query.length ? `${url}${url.includes("?") ? "&" : "?"}${query.join("&")}` : url,
    headers,
    body,
  };
}

/** Run the plan's `client.api()` chain. */
export async function runRawPlan(
  client: DataverseClient,
  plan: RawPlan,
  signal?: AbortSignal
): Promise<unknown> {
  let builder = client.api(plan.path);
  for (const call of plan.calls) {
    switch (call.name) {
      case "select":
        builder = builder.select(...call.args);
        break;
      case "orderBy":
        builder = builder.orderBy(...call.args);
        break;
      case "expand":
        builder = builder.expand(...call.args);
        break;
      case "filter":
        builder = builder.filter(call.args[0]);
        break;
      case "apply":
        builder = builder.apply(call.args[0]);
        break;
      case "preferRaw":
        builder = builder.preferRaw(call.args[0]);
        break;
      case "ifMatch":
        builder = builder.ifMatch(call.args[0]);
        break;
      case "ifNoneMatch":
        builder = builder.ifNoneMatch(call.args[0]);
        break;
      case "impersonate":
        builder = builder.impersonate(call.args[0]);
        break;
      case "impersonateByObjectId":
        builder = builder.impersonateByObjectId(call.args[0]);
        break;
      case "top":
        builder = builder.top(call.args[0]);
        break;
      case "count":
        builder = builder.count();
        break;
      case "header":
        builder = builder.header(call.args[0], call.args[1]);
        break;
    }
  }
  const options = { signal };
  switch (plan.terminal) {
    case "get":
      return builder.get(options);
    case "text":
      return builder.text(options);
    case "post":
      return builder.post(plan.body, options);
    case "patch":
      return builder.patch(plan.body, options);
    case "put":
      return builder.put(plan.body, options);
    case "delete":
      return builder.delete(options);
  }
}
