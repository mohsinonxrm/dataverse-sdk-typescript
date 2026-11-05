/**
 * @fileoverview Utilities for generating multipart/mixed batch request bodies
 *
 * The output follows the Dataverse Web API batch format: CRLF line endings, one
 * `application/http` part per request, a blank line after every part's HTTP headers (also when
 * there is no body), and a `Content-ID` on every part inside a change set.
 */

import type { BatchChangeset, BatchItem, BatchRequestStep } from "./types.js";

const CRLF = "\r\n";

/** The part content type Dataverse needs for a JSON body inside a batch. */
export const JSON_PART_CONTENT_TYPE = "application/json; type=entry";

/**
 * Generates a unique boundary string for multipart/mixed content
 *
 * @returns A boundary string
 */
export function generateBoundary(): string {
  return `batch_${String(Date.now())}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Generates a unique changeset boundary string
 *
 * @returns A changeset boundary string
 */
export function generateChangesetBoundary(): string {
  return `changeset_${String(Date.now())}_${Math.random().toString(36).substring(2, 15)}`;
}

/** True when the item is a change set rather than a single request. */
export function isChangeset(item: BatchItem): item is BatchChangeset {
  return Array.isArray((item as Partial<BatchChangeset>).changeset);
}

/**
 * Encodes a single request as one `application/http` part (without the boundary line).
 *
 * @param request - The request to encode
 * @param contentId - The Content-ID for this request (required inside change sets)
 * @returns The encoded part. It ends with the body, or with the CRLF of the last header line
 *   when there is no body; the caller adds the CRLF that comes before the next boundary.
 */
export function encodeRequest(request: BatchRequestStep, contentId?: string): string {
  const lines: string[] = ["Content-Type: application/http", "Content-Transfer-Encoding: binary"];
  if (contentId !== undefined) {
    lines.push(`Content-ID: ${contentId}`);
  }
  lines.push("");

  lines.push(`${request.method.toUpperCase()} ${request.url} HTTP/1.1`);

  const headers = request.headers ?? {};
  for (const [key, value] of Object.entries(headers)) {
    lines.push(`${key}: ${value}`);
  }

  if (request.body === undefined || request.body === null) {
    // No body: end the last header line, so that with the CRLF before the next boundary the
    // headers end with a blank line. Without it Dataverse reads the boundary line as a header
    // and rejects the batch (400 0x80060888).
    lines.push("");
    return lines.join(CRLF);
  }

  const body = typeof request.body === "string" ? request.body : JSON.stringify(request.body);
  const hasContentType = Object.keys(headers).some((k) => k.toLowerCase() === "content-type");
  if (!hasContentType) {
    // Dataverse rejects a body without a content type (400 0x80048d19).
    lines.push(`Content-Type: ${JSON_PART_CONTENT_TYPE}`);
  }
  lines.push("");
  lines.push(body);
  return lines.join(CRLF);
}

/**
 * Encodes requests as a change set part (without the batch boundary line).
 * Every request gets its own id as its `Content-ID`.
 *
 * @param requests - The requests to include in the changeset
 * @param changesetBoundary - The boundary for the changeset
 * @returns The encoded changeset part, ending with the closing change set boundary
 */
export function encodeChangeset(requests: BatchRequestStep[], changesetBoundary: string): string {
  let out = `Content-Type: multipart/mixed; boundary=${changesetBoundary}${CRLF}${CRLF}`;
  for (const request of requests) {
    out += `--${changesetBoundary}${CRLF}${encodeRequest(request, request.id)}${CRLF}`;
  }
  // A blank line after the closing change set boundary, as in Microsoft's examples.
  out += `--${changesetBoundary}--${CRLF}`;
  return out;
}

/** Options for {@link encodeBatchRequest}. */
export interface EncodeBatchOptions {
  /**
   * Boundary for the change set at `index` (0-based among change sets). Defaults to
   * {@link generateChangesetBoundary}. Useful for byte-exact tests.
   */
  changesetBoundary?: (index: number) => string;
}

/**
 * Encodes a complete batch request body. Items are written in the order given, so requests and
 * change sets can be interleaved.
 *
 * @param items - Requests and change sets, in the order to send them
 * @param boundary - The batch boundary
 * @param options - Encoding options
 * @returns The complete batch request body
 *
 * @example
 * ```typescript
 * const boundary = generateBoundary();
 * const body = encodeBatchRequest(
 *   [
 *     { id: "who", method: "GET", url: `${api}/WhoAmI` },
 *     { changeset: [{ id: "1", method: "POST", url: `${api}/accounts`, body: { name: "A" } }] },
 *   ],
 *   boundary
 * );
 * await client.send({
 *   method: "POST",
 *   url: "$batch",
 *   headers: { "content-type": `multipart/mixed; boundary=${boundary}` },
 *   body,
 * });
 * ```
 */
export function encodeBatchRequest(
  items: BatchItem[],
  boundary: string,
  options: EncodeBatchOptions = {}
): string {
  const nextChangesetBoundary = options.changesetBoundary ?? (() => generateChangesetBoundary());
  let out = "";
  let changesets = 0;
  for (const item of items) {
    out += `--${boundary}${CRLF}`;
    if (isChangeset(item)) {
      out += encodeChangeset(item.changeset, nextChangesetBoundary(changesets++));
    } else {
      out += encodeRequest(item);
    }
    out += CRLF;
  }
  out += `--${boundary}--${CRLF}`;
  return out;
}
