/**
 * `POST $batch` for the demo environment: decodes the multipart request, runs each part through
 * the same router, and encodes a multipart response the way Dataverse does. A change set runs
 * as a transaction: when one of its requests fails, its changes are rolled back and only the
 * failure is returned. Without `Prefer: odata.continue-on-error`, the batch stops there.
 */
import {
  DEMO_API_URL,
  handle,
  odataError,
  type DemoState,
  type FakeRequest,
  type FakeResponse,
} from "./fakeDataverse";
import type { Row } from "./store";

const CRLF = "\r\n";

interface Part {
  headers: Record<string, string>;
  body: string;
}

function boundaryOf(contentType: string | undefined): string | undefined {
  return /boundary=("?)([^";]+)\1/i.exec(contentType ?? "")?.[2];
}

function splitHead(text: string): Part {
  const index = text.search(/\r?\n\r?\n/);
  const head = index < 0 ? text : text.slice(0, index);
  const body = index < 0 ? "" : text.slice(index).replace(/^\r?\n\r?\n/, "");
  const headers: Record<string, string> = {};
  for (const line of head.split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon > 0)
      headers[line.slice(0, colon).trim().toLowerCase()] = line.slice(colon + 1).trim();
  }
  return { headers, body };
}

function multipart(body: string, boundary: string): Part[] {
  return body
    .split(`--${boundary}`)
    .slice(1)
    .filter((chunk) => !chunk.startsWith("--"))
    .map((chunk) => splitHead(chunk.replace(/^\r?\n/, "").replace(/\r?\n$/, "")));
}

/** The HTTP request inside an `application/http` part. */
function innerRequest(part: Part, contentIds: Map<string, string>): FakeRequest {
  const [line = "", ...rest] = part.body.split(/\r?\n/);
  const [method = "GET", target = ""] = line.split(" ");
  const inner = splitHead(rest.join(CRLF));
  const resolve = (text: string) =>
    text.replace(/\$(\d+|[A-Za-z][\w.~-]*)/g, (whole, id: string) => contentIds.get(id) ?? whole);
  const resolved = resolve(target);
  const url = /^https?:/.test(resolved)
    ? resolved
    : `${DEMO_API_URL}/${resolved.replace(/^\//, "")}`;
  return {
    method: method.toUpperCase(),
    url: new URL(url),
    headers: inner.headers,
    body: resolve(inner.body.trim()),
  };
}

function encodeResponse(res: FakeResponse, contentId?: string): string {
  const body =
    res.body === undefined
      ? ""
      : typeof res.body === "string"
        ? res.body
        : new TextDecoder().decode(res.body);
  return [
    "Content-Type: application/http",
    "Content-Transfer-Encoding: binary",
    ...(contentId ? [`Content-ID: ${contentId}`] : []),
    "",
    `HTTP/1.1 ${res.status} ${res.status < 300 ? "OK" : "Error"}`,
    "OData-Version: 4.0",
    ...Object.entries(res.headers).map(([k, v]) => `${k}: ${v}`),
    "",
    body,
  ].join(CRLF);
}

function snapshot(state: DemoState): Map<string, Map<string, Row>> {
  const copy = new Map<string, Map<string, Row>>();
  for (const [name, table] of state.schema.tables) {
    copy.set(name, new Map([...table.rows].map(([id, row]) => [id, { ...row }])));
  }
  return copy;
}

function restore(state: DemoState, saved: Map<string, Map<string, Row>>): void {
  for (const [name, rows] of saved) {
    const table = state.schema.tables.get(name);
    if (table) table.rows = rows;
  }
}

export async function handleBatch(state: DemoState, req: FakeRequest): Promise<FakeResponse> {
  const boundary = boundaryOf(req.headers["content-type"]);
  if (!boundary)
    return odataError(
      400,
      "0x80048d19",
      "The batch request must have a multipart/mixed content type with a boundary."
    );
  const continueOnError = /odata\.continue-on-error/i.test(req.headers.prefer ?? "");
  const out = `batchresponse_${crypto.randomUUID()}`;
  let response = "";
  let changesets = 0;

  for (const part of multipart(req.body, boundary)) {
    const changesetBoundary = boundaryOf(part.headers["content-type"]);
    let failed = false;
    if (changesetBoundary) {
      const saved = snapshot(state);
      const contentIds = new Map<string, string>();
      const answers: Array<{ res: FakeResponse; contentId?: string }> = [];
      for (const inner of multipart(part.body, changesetBoundary)) {
        const contentId = inner.headers["content-id"];
        const res = await handle(state, innerRequest(inner, contentIds));
        if (res.status >= 400) {
          failed = true;
          restore(state, saved);
          response += `--${out}${CRLF}${encodeResponse(res, contentId)}${CRLF}`;
          break;
        }
        const location = res.headers["odata-entityid"];
        if (contentId && location) contentIds.set(contentId, location);
        answers.push({ res, contentId });
      }
      if (!failed) {
        const cs = `changesetresponse_${String(++changesets)}_${crypto.randomUUID()}`;
        response += `--${out}${CRLF}Content-Type: multipart/mixed; boundary=${cs}${CRLF}${CRLF}`;
        for (const a of answers)
          response += `--${cs}${CRLF}${encodeResponse(a.res, a.contentId)}${CRLF}`;
        response += `--${cs}--${CRLF}`;
      }
    } else {
      const res = await handle(state, innerRequest(part, new Map()));
      failed = res.status >= 400;
      response += `--${out}${CRLF}${encodeResponse(res)}${CRLF}`;
    }
    if (failed && !continueOnError) break;
  }
  response += `--${out}--${CRLF}`;
  return {
    status: 200,
    headers: {
      "content-type": `multipart/mixed; boundary=${out}`,
      ...(continueOnError ? { "preference-applied": "odata.continue-on-error" } : {}),
    },
    body: response,
  };
}
