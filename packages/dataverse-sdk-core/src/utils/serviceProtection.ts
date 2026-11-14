import type { DataverseErrorCode } from "../errors/errorCodes.js";

/** Dataverse error codes of the service protection limits, by the limit they name. */
export const THROTTLE_LIMITS: Readonly<Record<string, string>> = {
  "0x80072322": "requests",
  "0x80072321": "execution_time",
  "0x80072326": "concurrent_requests",
} satisfies Partial<Record<DataverseErrorCode, string>>;

/** The service protection error of too many concurrent requests (per user, per web server). */
export const CONCURRENT_REQUESTS_CODE = "0x80072326" satisfies DataverseErrorCode;

/**
 * The error code of a JSON 429 body (`{"error":{"code":"0x80072322",…}}`), lower-cased, read from
 * a clone so the response is untouched. A `$batch` 429 with per-request results (multipart) isn't
 * read.
 */
export async function throttleErrorCode(res: Response): Promise<string | undefined> {
  if (!/json/i.test(res.headers.get("content-type") ?? "") || res.bodyUsed) return undefined;
  try {
    const body = JSON.parse(await res.clone().text()) as { error?: { code?: unknown } } | null;
    const code = body?.error?.code;
    return typeof code === "string" && /^0x[0-9a-f]{8}$/i.test(code)
      ? code.toLowerCase()
      : undefined;
  } catch {
    return undefined;
  }
}
