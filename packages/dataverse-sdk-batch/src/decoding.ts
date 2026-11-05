/**
 * @fileoverview Utilities for parsing multipart/mixed batch responses
 *
 * Parsing is case-insensitive for header names and media types, accepts quoted boundaries,
 * CRLF or LF line endings and trailing whitespace on boundary lines, and never trims bodies.
 */

import type { BatchResponsePart } from "./types.js";

/**
 * Extracts the boundary parameter from a Content-Type header value.
 *
 * @param contentType - The Content-Type header value
 * @returns The boundary (unquoted) or null if not found
 */
export function extractBoundary(contentType: string): string | null {
  const quoted = /(?:^|;)\s*boundary\s*=\s*"([^"]*)"/i.exec(contentType);
  if (quoted) return quoted[1] === "" ? null : quoted[1];
  const bare = /(?:^|;)\s*boundary\s*=\s*([^;\s"]+)/i.exec(contentType);
  return bare ? bare[1] : null;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Splits multipart content into its body parts.
 *
 * A delimiter is a line holding `--boundary` (or `--boundary--` for the last one), optionally
 * followed by spaces or tabs. The line break before a delimiter belongs to the delimiter, so it
 * is not part of the preceding part. The preamble and the epilogue are dropped.
 *
 * @param content - The multipart content
 * @param boundary - The boundary string
 * @returns The parts, each exactly as it appears between two delimiters
 */
export function splitMultipart(content: string, boundary: string): string[] {
  const delimiter = new RegExp(
    `(?:^|\\r?\\n)--${escapeRegExp(boundary)}(--)?[ \\t]*(?=\\r?\\n|$)`,
    "g"
  );
  const parts: string[] = [];
  let start = -1;
  for (const match of content.matchAll(delimiter)) {
    if (start >= 0) parts.push(content.slice(start, match.index));
    if (match[1] === "--") return parts;
    // The part starts after the line break that ends the delimiter line.
    const end = match.index + match[0].length;
    start = content.startsWith("\r\n", end)
      ? end + 2
      : content.startsWith("\n", end)
        ? end + 1
        : end;
  }
  // No closing delimiter: keep what was read (a truncated response still yields its parts).
  if (start >= 0 && start < content.length) parts.push(content.slice(start));
  return parts;
}

/**
 * Splits an entity (headers, blank line, body) at the first blank line.
 * A block with no blank line is all headers.
 */
function splitHeaderBlock(text: string): { headers: Record<string, string>; body: string } {
  const blank = /\r?\n\r?\n/.exec(text);
  // A part may start with the blank line itself (no headers).
  const leading = /^\r?\n/.exec(text);
  let headerText: string;
  let body: string;
  if (leading) {
    headerText = "";
    body = text.slice(leading[0].length);
  } else if (blank) {
    headerText = text.slice(0, blank.index);
    body = text.slice(blank.index + blank[0].length);
  } else {
    headerText = text.replace(/\r?\n$/, "");
    body = "";
  }
  return { headers: parseHeaders(headerText), body };
}

/**
 * Parses header lines into a record with lower-cased names. Repeated names are joined with `, `.
 */
function parseHeaders(headerText: string): Record<string, string> {
  const headers: Record<string, string> = {};
  if (headerText === "") return headers;
  for (const line of headerText.split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon <= 0) continue;
    const name = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();
    headers[name] = name in headers ? `${headers[name] ?? ""}, ${value}` : value;
  }
  return headers;
}

function mediaType(contentType: string | undefined): string {
  return (contentType ?? "").split(";")[0]?.trim().toLowerCase() ?? "";
}

function isJsonContentType(contentType: string | undefined): boolean {
  const type = mediaType(contentType);
  return type === "application/json" || type.endsWith("+json");
}

/**
 * Parses the embedded HTTP response of an `application/http` part.
 */
function parseHttpResponse(
  text: string
): Pick<BatchResponsePart, "status" | "statusText" | "headers" | "body" | "bodyText"> {
  const lineEnd = /\r?\n/.exec(text);
  const statusLine = lineEnd ? text.slice(0, lineEnd.index) : text;
  const statusMatch = /^HTTP\/\d+(?:\.\d+)?\s+(\d{3})(?:\s+(.*))?$/i.exec(statusLine.trim());
  if (!statusMatch) {
    throw new Error(`Invalid HTTP status line in batch response part: ${statusLine}`);
  }
  const rest = lineEnd ? text.slice(lineEnd.index + lineEnd[0].length) : "";
  const { headers, body: bodyText } = splitHeaderBlock(rest);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any;
  if (bodyText !== "") {
    body = bodyText;
    if (isJsonContentType(headers["content-type"])) {
      try {
        body = JSON.parse(bodyText);
      } catch {
        // Not valid JSON after all: keep the text.
      }
    }
  }

  return {
    status: Number(statusMatch[1]),
    // The reason phrase is optional (group 2 is then undefined at runtime).
    statusText: statusMatch[2] ? statusMatch[2].trim() : "",
    headers,
    body,
    bodyText,
  };
}

/**
 * Decodes one `application/http` part (with its MIME headers).
 */
function decodeOperation(
  mimeHeaders: Record<string, string>,
  content: string,
  batchIndex: number,
  inChangeset: boolean
): BatchResponsePart {
  return {
    ...("content-id" in mimeHeaders ? { contentId: mimeHeaders["content-id"] } : {}),
    batchIndex,
    inChangeset,
    ...parseHttpResponse(content),
  };
}

/**
 * Parses a batch response body into one entry per operation response, in the order received.
 *
 * Responses inside a change set are flattened in place and keep their `Content-ID`. Responses
 * outside a change set have none (Dataverse does not echo it), so they are matched to requests
 * by position: see {@link BatchResponsePart.batchIndex}.
 *
 * @param responseBody - The raw batch response body
 * @param contentType - The Content-Type header from the response
 * @returns Every operation response, in order
 */
export function decodeBatchResponse(
  responseBody: string,
  contentType: string
): BatchResponsePart[] {
  const boundary = extractBoundary(contentType);
  if (!boundary) {
    throw new Error("No boundary found in Content-Type header");
  }

  const responses: BatchResponsePart[] = [];
  const parts = splitMultipart(responseBody, boundary);
  parts.forEach((part, batchIndex) => {
    const { headers, body } = splitHeaderBlock(part);
    const type = mediaType(headers["content-type"]);
    if (type === "multipart/mixed") {
      const changesetBoundary = extractBoundary(headers["content-type"] ?? "");
      if (!changesetBoundary) {
        throw new Error("No boundary found in a change set part of the batch response");
      }
      for (const inner of splitMultipart(body, changesetBoundary)) {
        const op = splitHeaderBlock(inner);
        responses.push(decodeOperation(op.headers, op.body, batchIndex, true));
      }
    } else {
      responses.push(decodeOperation(headers, body, batchIndex, false));
    }
  });
  return responses;
}
