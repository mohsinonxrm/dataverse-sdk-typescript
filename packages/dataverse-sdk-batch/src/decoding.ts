/**
 * @fileoverview Utilities for parsing multipart/mixed batch responses
 */

import type { BatchResponseStep } from "./types.js";

/**
 * Extracts boundary from Content-Type header
 *
 * @param contentType - The Content-Type header value
 * @returns The boundary string or null if not found
 */
export function extractBoundary(contentType: string): string | null {
  const match = /boundary=([^;]+)/.exec(contentType);
  return match ? match[1].trim() : null;
}

/**
 * Splits multipart content by boundary
 *
 * @param content - The multipart content
 * @param boundary - The boundary string
 * @returns Array of parts (excluding preamble/epilogue)
 */
export function splitMultipart(content: string, boundary: string): string[] {
  const parts: string[] = [];
  const boundaryMarker = `--${boundary}`;
  const endMarker = `--${boundary}--`;

  const lines = content.split("\r\n");
  let currentPart: string[] = [];
  let inPart = false;

  for (const line of lines) {
    if (line === boundaryMarker) {
      if (inPart && currentPart.length > 0) {
        parts.push(currentPart.join("\r\n"));
        currentPart = [];
      }
      inPart = true;
    } else if (line === endMarker) {
      if (currentPart.length > 0) {
        parts.push(currentPart.join("\r\n"));
      }
      break;
    } else if (inPart) {
      currentPart.push(line);
    }
  }

  return parts;
}

/**
 * Parses headers from a response part
 *
 * @param headerLines - Array of header lines
 * @returns Map of header name to value
 */
function parseHeaders(headerLines: string[]): Record<string, string> {
  const headers: Record<string, string> = {};

  for (const line of headerLines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const name = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      headers[name] = value;
    }
  }

  return headers;
}

/**
 * Parses an HTTP response from a batch part
 *
 * @param part - The response part content
 * @returns Parsed response step
 */
function parseResponsePart(part: string): Omit<BatchResponseStep, "id"> {
  const lines = part.split("\r\n");

  // Find where HTTP response starts (after part headers)
  let httpStartIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("HTTP/")) {
      httpStartIndex = i;
      break;
    }
  }

  // Parse HTTP status line
  const statusLine = lines[httpStartIndex];
  const statusMatch = /HTTP\/[\d.]+\s+(\d+)\s*(.*)/.exec(statusLine);
  if (!statusMatch) {
    throw new Error(`Invalid HTTP status line: ${statusLine}`);
  }

  const status = parseInt(statusMatch[1], 10);
  const statusText = statusMatch[2] || "";

  // Parse response headers
  let headerEndIndex = httpStartIndex + 1;
  const headerLines: string[] = [];
  for (let i = httpStartIndex + 1; i < lines.length; i++) {
    if (lines[i] === "") {
      headerEndIndex = i;
      break;
    }
    headerLines.push(lines[i]);
  }

  const headers = parseHeaders(headerLines);

  // Parse body (everything after empty line)
  const bodyLines = lines.slice(headerEndIndex + 1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any;

  if (bodyLines.length > 0) {
    const bodyText = bodyLines.join("\r\n").trim();
    if (bodyText) {
      // Try to parse as JSON
      const contentType = headers["Content-Type"] || headers["content-type"] || "";
      if (contentType.includes("application/json")) {
        try {
          body = JSON.parse(bodyText);
        } catch {
          body = bodyText;
        }
      } else {
        body = bodyText;
      }
    }
  }

  return {
    status,
    statusText,
    headers,
    body,
  };
}

/**
 * Extracts Content-ID from part headers
 *
 * @param part - The part content
 * @returns Content-ID or null
 */
function extractContentId(part: string): string | null {
  const lines = part.split("\r\n");
  for (const line of lines) {
    if (line.toLowerCase().startsWith("content-id:")) {
      return line.substring(11).trim();
    }
  }
  return null;
}

/**
 * Parses a batch response body
 *
 * @param responseBody - The raw batch response body
 * @param contentType - The Content-Type header from the response
 * @returns Map of request ID to response
 */
export function decodeBatchResponse(
  responseBody: string,
  contentType: string
): Map<string, BatchResponseStep> {
  const boundary = extractBoundary(contentType);
  if (!boundary) {
    throw new Error("No boundary found in Content-Type header");
  }

  const parts = splitMultipart(responseBody, boundary);
  const responses = new Map<string, BatchResponseStep>();

  for (const part of parts) {
    // Check if this part is a changeset (multipart/mixed)
    if (part.includes("Content-Type: multipart/mixed")) {
      // Extract changeset boundary
      const changesetContentType = /Content-Type: multipart\/mixed; boundary=([^\r\n]+)/.exec(part);
      if (changesetContentType) {
        const changesetBoundary = changesetContentType[1].trim();
        const changesetParts = splitMultipart(part, changesetBoundary);

        for (const changesetPart of changesetParts) {
          const contentId = extractContentId(changesetPart);
          if (contentId) {
            const response = parseResponsePart(changesetPart);
            responses.set(contentId, {
              id: contentId,
              ...response,
            });
          }
        }
      }
    } else if (part.includes("HTTP/")) {
      // Individual response (not in changeset)
      const contentId = extractContentId(part);
      if (contentId) {
        const response = parseResponsePart(part);
        responses.set(contentId, {
          id: contentId,
          ...response,
        });
      }
    }
  }

  return responses;
}
