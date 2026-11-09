import { DataverseInvalidRequestError } from "../errors/NamedErrors.js";

/**
 * Read a JSON response body. Resolves `undefined` for `204 No Content` or an empty body, and
 * rejects with `DataverseInvalidRequestError` ("UnexpectedContentType") when the body isn't JSON.
 */
export async function readJson<T>(res: Response): Promise<T> {
  const text = res.status === 204 ? "" : await res.text();
  if (text.trim() === "") return undefined as T;
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType !== "" && !/[/+]json\b/i.test(contentType)) {
    const error = new DataverseInvalidRequestError(
      `Expected a JSON response but got "${contentType}". Use .text(), .blob(), .arrayBuffer() or .response() for non-JSON content.`
    );
    error.name = "UnexpectedContentType";
    throw error;
  }
  return JSON.parse(text) as T;
}

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const NO_ID_HEADER = "The response has no OData-EntityId or Location header with a record id";

/**
 * The record id from a create response's `OData-EntityId` header (or `Location`), e.g.
 * `https://org.crm.dynamics.com/api/data/v9.2/accounts(00000000-…)` → `"00000000-…"`.
 *
 * A create sent with `Prefer: return=representation` is answered `201 Created` with the record in
 * the body and neither header, so this throws for it: read the table's primary key from the body
 * instead, or use `createAndGetId(body, { primaryIdAttribute })`.
 *
 * @throws {DataverseInvalidRequestError} When neither header holds an id.
 */
export function entityIdFromResponse(res: Response): string {
  const id = entityIdFromHeaders(res.headers);
  if (id === undefined) {
    throw new DataverseInvalidRequestError(
      `${NO_ID_HEADER}. A create sent with Prefer: return=representation returns the record in ` +
        `the body instead: read the table's primary key from it.`
    );
  }
  return id;
}

/** The id from the `OData-EntityId` / `Location` header, or `undefined` when neither holds one. */
function entityIdFromHeaders(headers: Headers): string | undefined {
  const header = headers.get("odata-entityid") ?? headers.get("location") ?? "";
  const match = /\(([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\)\s*$/i.exec(
    header
  );
  return match?.[1];
}

/**
 * The id of a created record: from the `OData-EntityId` / `Location` header, or, when neither
 * holds one (`Prefer: return=representation`), from `primaryIdAttribute` of the JSON body. The
 * body is released without waiting when it isn't needed: a body tee'd by logging middleware only
 * settles a cancel once every branch is done (#289).
 */
export async function createdEntityId(
  res: Response,
  primaryIdAttribute: string | undefined
): Promise<string> {
  const fromHeaders = entityIdFromHeaders(res.headers);
  if (fromHeaders !== undefined || !primaryIdAttribute) {
    res.body?.cancel().catch(() => undefined);
    if (fromHeaders !== undefined) return fromHeaders;
    throw new DataverseInvalidRequestError(
      `${NO_ID_HEADER}. A create sent with Prefer: return=representation returns the record in ` +
        `the body instead: pass { primaryIdAttribute } (e.g. "accountid") to read the id from it.`
    );
  }
  const record = await readJson<unknown>(res);
  const value =
    typeof record === "object" && record !== null
      ? (record as Record<string, unknown>)[primaryIdAttribute]
      : undefined;
  if (typeof value === "string" && GUID.test(value)) return value;
  throw new DataverseInvalidRequestError(
    `${NO_ID_HEADER}, and its body has no GUID in "${primaryIdAttribute}".`
  );
}
