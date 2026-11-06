/**
 * @fileoverview The record id from a `$batch` response part
 */

import {
  DataverseInvalidRequestError,
  entityIdFromResponse,
} from "@mohsinonxrm/dataverse-sdk-core";

/** The headers that can carry the created record's URL, in the order core reads them. */
const ID_HEADERS = ["odata-entityid", "location"];

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Options for {@link entityIdFromBatchResponse}. */
export interface EntityIdFromBatchResponseOptions {
  /**
   * The table's primary key column, e.g. `"contactid"`. A create sent with
   * `Prefer: return=representation` is answered `201 Created` with the record in the body and no
   * `OData-EntityId` or `Location` header, so the id is read from this property of the body.
   * Not needed for a plain create (`204 No Content`), whose headers carry the id.
   */
  primaryIdAttribute?: string;
}

/**
 * The record id a create in a `$batch` returned.
 *
 * - A plain create (`204 No Content`) carries the record URL in its `OData-EntityId` header (or
 *   `Location`), e.g. `https://org.crm.dynamics.com/api/data/v9.2/accounts(00000000-…)`; the id
 *   is read from there, as `entityIdFromResponse` from `@mohsinonxrm/dataverse-sdk-core` does for
 *   a `Response`.
 * - A create with `Prefer: return=representation` (`201 Created`) has neither header: Dataverse
 *   returns the record in the body. Pass `primaryIdAttribute` (e.g. `"contactid"`) to read the id
 *   from the body. The headers win when both are present.
 *
 * Accepts a `BatchResponseStep` (from `execute()`) or a `BatchResponsePart` (from
 * `decodeBatchResponse()`). Header names are matched case-insensitively.
 *
 * @param part - A batch response step or part
 * @param options - `primaryIdAttribute` for creates that return the record
 * @returns The record id (a GUID)
 * @throws {DataverseInvalidRequestError} When no header holds an id and the body has no GUID in
 *   `primaryIdAttribute` (or none was given), e.g. the request was not a create, or the URL names
 *   the record by an alternate key. The message says which of these is missing.
 *
 * @example
 * ```typescript
 * batch.beginChangeset();
 * batch.addRequest("acct", "POST", "accounts", undefined, { name: "Contoso" });
 * batch.addRequest("contact", "POST", "contacts", { prefer: "return=representation" }, {
 *   lastname: "Doe",
 * });
 * batch.endChangeset();
 * const result = await batch.execute();
 * const accountId = entityIdFromBatchResponse(result.responses.get("acct")!);
 * const contactId = entityIdFromBatchResponse(result.responses.get("contact")!, {
 *   primaryIdAttribute: "contactid",
 * });
 * ```
 */
export function entityIdFromBatchResponse(
  part: { headers: Record<string, string>; body?: unknown },
  options: EntityIdFromBatchResponseOptions = {}
): string {
  const fromHeaders = idFromHeaders(part.headers);
  if (fromHeaders !== undefined) return fromHeaders;

  const headerNote =
    "The $batch response has no OData-EntityId or Location header with a record id";
  const key = options.primaryIdAttribute;
  if (key === undefined || key === "") {
    throw new DataverseInvalidRequestError(
      `${headerNote}. A create sent with Prefer: return=representation returns the record in the ` +
        `body instead: pass { primaryIdAttribute } (e.g. "contactid") to read the id from it.`
    );
  }
  const body = part.body;
  const value =
    typeof body === "object" && body !== null ? (body as Record<string, unknown>)[key] : undefined;
  if (typeof value === "string" && GUID.test(value)) return value;
  throw new DataverseInvalidRequestError(`${headerNote}, and its body has no GUID in "${key}".`);
}

/** The id from the `OData-EntityId` / `Location` header, or `undefined` when neither holds one. */
function idFromHeaders(source: Record<string, string>): string | undefined {
  const headers = new Headers();
  for (const [name, value] of Object.entries(source)) {
    if (!ID_HEADERS.includes(name.toLowerCase())) continue;
    try {
      headers.set(name, value);
    } catch {
      // A value `Headers` rejects (non-Latin-1 text) is not a record URL; treat it as absent.
    }
  }
  try {
    return entityIdFromResponse(new Response(null, { headers }));
  } catch (error) {
    if (error instanceof DataverseInvalidRequestError) return undefined;
    throw error;
  }
}
