/** Response headers as a plain object with lower-cased names. */
export function headersToRecord(headers: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  headers.forEach((value, name) => {
    out[name.toLowerCase()] = value;
  });
  return out;
}

/**
 * Dataverse's id for a request, the one support asks for: `x-ms-service-request-id`, then
 * `req_id` (sent as `REQ_ID`), then the older `req-id` / `x-ms-request-id`.
 */
export function requestIdFrom(headers: Headers): string | undefined {
  for (const name of ["x-ms-service-request-id", "req_id", "req-id", "x-ms-request-id"]) {
    const value = headers.get(name);
    if (value) return value.split(",")[0]?.trim();
  }
  return undefined;
}

const correlationIds = new WeakMap<Response, string>();

/** Remember which correlation id a response belongs to (set by `DataverseClient.send()`). */
export function setResponseCorrelationId(res: Response, correlationId: string | undefined): void {
  if (correlationId) correlationIds.set(res, correlationId);
}

/** The correlation id `DataverseClient.send()` used for the request behind `res`. */
export function responseCorrelationId(res: Response): string | undefined {
  return correlationIds.get(res);
}
