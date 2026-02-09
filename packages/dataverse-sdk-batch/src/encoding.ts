/**
 * @fileoverview Utilities for generating multipart/mixed batch request bodies
 */

import type { BatchRequestStep } from "./types.js";

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

/**
 * Encodes a single request as multipart content
 *
 * @param request - The request to encode
 * @param contentId - The Content-ID for this request (used in changesets)
 * @returns The encoded request string
 */
export function encodeRequest(request: BatchRequestStep, contentId?: string): string {
  const lines: string[] = [];

  // Content-Type and Content-Transfer-Encoding
  lines.push("Content-Type: application/http");
  lines.push("Content-Transfer-Encoding: binary");

  // Content-ID (if in changeset)
  if (contentId !== undefined) {
    lines.push(`Content-ID: ${contentId}`);
  }

  lines.push(""); // Empty line after headers

  // HTTP request line
  lines.push(`${request.method} ${request.url} HTTP/1.1`);

  // Request headers
  if (request.headers) {
    for (const [key, value] of Object.entries(request.headers)) {
      lines.push(`${key}: ${value}`);
    }
  }

  // Body (if present)
  if (request.body !== undefined) {
    let bodyString: string;
    if (typeof request.body === "string") {
      bodyString = request.body;
    } else {
      bodyString = JSON.stringify(request.body);
    }

    lines.push(""); // Empty line before body
    lines.push(bodyString);
  }

  return lines.join("\r\n");
}

/**
 * Encodes requests as a changeset
 *
 * @param requests - The requests to include in the changeset
 * @param changesetBoundary - The boundary for the changeset
 * @returns The encoded changeset string
 */
export function encodeChangeset(requests: BatchRequestStep[], changesetBoundary: string): string {
  const lines: string[] = [];

  lines.push(`Content-Type: multipart/mixed; boundary=${changesetBoundary}`);
  lines.push(""); // Empty line after content-type

  for (let i = 0; i < requests.length; i++) {
    lines.push(`--${changesetBoundary}`);
    lines.push(encodeRequest(requests[i], String(i + 1)));
  }

  lines.push(`--${changesetBoundary}--`); // Closing boundary

  return lines.join("\r\n");
}

/**
 * Encodes a complete batch request body
 *
 * @param requests - Individual requests (not in changesets)
 * @param changesets - Array of changeset request arrays
 * @param boundary - The batch boundary
 * @returns The complete batch request body
 */
export function encodeBatchRequest(
  requests: BatchRequestStep[],
  changesets: BatchRequestStep[][],
  boundary: string
): string {
  const lines: string[] = [];

  // Encode individual requests
  for (const request of requests) {
    lines.push(`--${boundary}`);
    lines.push(encodeRequest(request));
  }

  // Encode changesets
  for (const changeset of changesets) {
    const changesetBoundary = generateChangesetBoundary();
    lines.push(`--${boundary}`);
    lines.push(encodeChangeset(changeset, changesetBoundary));
  }

  // Closing boundary
  lines.push(`--${boundary}--`);

  return lines.join("\r\n");
}
