import { DataverseODataError } from "./DataverseODataError.js";
import { DataverseThrottleError } from "./DataverseThrottleError.js";

export async function parseODataError(res: Response, rawText?: string): Promise<Error> {
  const status = res.status;
  const requestId = res.headers.get("x-ms-request-id") ?? res.headers.get("req-id") ?? undefined;

  const retryAfter = res.headers.get("retry-after");
  const retryAfterMs = retryAfter ? parseRetryAfterMs(retryAfter) : undefined;

  const bodyText = rawText ?? (await safeReadText(res));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const parsed = safeJson(bodyText);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unnecessary-condition
  const message =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    parsed?.error?.message ?? parsed?.message ?? `HTTP ${String(status)}`;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const code = parsed?.error?.code ?? parsed?.code;

  if (status === 429) {
    return new DataverseThrottleError(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      message,
      {
        status,
        code,
        requestId,

        raw: parsed ?? bodyText,
        retryAfterMs,
      }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return new DataverseODataError(message, { status, code, requestId, raw: parsed ?? bodyText });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeJson(text: string): any {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

async function safeReadText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

function parseRetryAfterMs(value: string): number | undefined {
  const s = value.trim();
  const seconds = Number(s);
  if (!Number.isNaN(seconds) && Number.isFinite(seconds)) {
    return Math.max(0, seconds * 1000);
  }
  // HTTP-date
  const date = Date.parse(s);
  if (!Number.isNaN(date)) {
    const diff = date - Date.now();
    return diff > 0 ? diff : 0;
  }
  return undefined;
}
