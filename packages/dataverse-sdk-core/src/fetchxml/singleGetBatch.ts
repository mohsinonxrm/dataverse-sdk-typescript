/**
 * A `$batch` that carries one GET. Microsoft documents this as the way to send a query whose URL
 * is longer than the Web API's URL limit: the URL goes in the request body instead.
 * @see https://learn.microsoft.com/power-apps/developer/data-platform/webapi/execute-batch-operations-using-web-api
 */
import { generateUUID } from "../utils/HeaderUtils.js";

const CRLF = "\r\n";

/** Headers that describe the outer request, not the inner GET. */
const OUTER_ONLY = new Set(["content-type", "content-length", "authorization"]);

/** The multipart body and content type of a `$batch` holding `GET url` with `headers`. */
export function buildSingleGetBatch(
  url: string,
  headers: Record<string, string>
): { body: string; contentType: string } {
  const boundary = `batch_${generateUUID()}`;
  const inner = Object.entries(headers)
    .filter(([name]) => !OUTER_ONLY.has(name.toLowerCase()))
    .map(([name, value]) => `${name}: ${value}`);
  const body = [
    `--${boundary}`,
    "Content-Type: application/http",
    "Content-Transfer-Encoding: binary",
    "",
    `GET ${url} HTTP/1.1`,
    ...inner,
    "",
    "",
    `--${boundary}--`,
    "",
  ].join(CRLF);
  return { body, contentType: `multipart/mixed; boundary=${boundary}` };
}

/**
 * The inner response of a single-request `$batch` response, as a `Response` with its own status,
 * headers and body. Throws `TypeError` when the body isn't a `multipart/mixed` batch response.
 */
export async function readSingleBatchResponse(res: Response): Promise<Response> {
  const contentType = res.headers.get("content-type") ?? "";
  const boundary = /boundary=("?)([^";]+)\1/i.exec(contentType)?.[2];
  const text = await res.text();
  if (!boundary) throw new TypeError("The $batch response is not multipart/mixed.");

  const delimiter = `--${boundary}`;
  const parts = text.split(delimiter).slice(1); // before the first delimiter is preamble
  const part = parts.find((p) => !p.startsWith("--") && p.trim() !== "");
  if (!part) throw new TypeError("The $batch response has no parts.");

  // Part headers (Content-Type: application/http, …), a blank line, then the HTTP message.
  const message = afterBlankLine(part.replace(/^\r?\n/, ""));
  const head = splitHead(message);
  const statusLine = /^HTTP\/\d(?:\.\d)?\s+(\d{3})\s*(.*)$/.exec(head.lines[0] ?? "");
  if (!statusLine?.[1]) throw new TypeError("The $batch response part has no HTTP status line.");

  const headers = new Headers();
  for (const line of head.lines.slice(1)) {
    const colon = line.indexOf(":");
    if (colon > 0) headers.append(line.slice(0, colon).trim(), line.slice(colon + 1).trim());
  }
  const status = Number(statusLine[1]);
  // The body runs up to the next delimiter; drop the line break that precedes it.
  const body = head.rest.replace(/\r?\n$/, "");
  const noBody = status === 204 || status === 304 || body === "";
  return new Response(noBody ? null : body, {
    status,
    statusText: statusLine[2],
    headers,
  });
}

function afterBlankLine(text: string): string {
  const m = /\r?\n\r?\n/.exec(text);
  return m ? text.slice(m.index + m[0].length) : "";
}

function splitHead(message: string): { lines: string[]; rest: string } {
  const m = /\r?\n\r?\n/.exec(message);
  const head = m ? message.slice(0, m.index) : message;
  const rest = m ? message.slice(m.index + m[0].length) : "";
  return { lines: head.split(/\r?\n/), rest };
}
