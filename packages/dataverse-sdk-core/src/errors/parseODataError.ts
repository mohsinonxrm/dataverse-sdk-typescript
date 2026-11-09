import { DataverseODataError } from "./DataverseODataError.js";
import { DataverseThrottleError } from "./DataverseThrottleError.js";
import type { DataverseInnerError } from "./DataverseError.js";
import { parseRetryAfter } from "../utils/HeaderUtils.js";
import { headersToRecord, requestIdFrom, responseCorrelationId } from "./responseDetails.js";

/**
 * The typed error for a failed response: `DataverseThrottleError` for 429, otherwise
 * `DataverseODataError`. Both carry `status`, `code`, `message`, `headers`, `body` (parsed JSON
 * or text), `innerError`, `requestId` and, for responses from `DataverseClient.send()`,
 * `correlationId`.
 */
export async function parseODataError(res: Response, rawText?: string): Promise<Error> {
  const status = res.status;
  const requestId = requestIdFrom(res.headers);
  const correlationId = responseCorrelationId(res);
  const headers = headersToRecord(res.headers);
  const retryAfterMs = parseRetryAfter(res.headers.get("retry-after"));

  const bodyText = rawText ?? (await safeReadText(res));
  const parsed = safeJson(bodyText);
  const error = isRecord(parsed) && isRecord(parsed.error) ? parsed.error : undefined;

  const message =
    stringOrUndefined(error?.message) ??
    (isRecord(parsed) ? stringOrUndefined(parsed.message) : undefined) ??
    `HTTP ${String(status)}`;
  const code =
    stringOrUndefined(error?.code) ??
    (isRecord(parsed) ? stringOrUndefined(parsed.code) : undefined);
  const innerError = isRecord(error?.innererror)
    ? (error.innererror as DataverseInnerError)
    : undefined;

  const init = {
    status,
    code,
    requestId,
    correlationId,
    headers,
    innerError,
    raw: parsed ?? bodyText,
  };
  if (status === 429) {
    return new DataverseThrottleError(message, { ...init, retryAfterMs });
  }
  return new DataverseODataError(message, init);
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function stringOrUndefined(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

async function safeReadText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return "";
  }
}
