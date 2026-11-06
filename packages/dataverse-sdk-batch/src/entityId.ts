/**
 * @fileoverview The record id from a `$batch` response part
 */

import { entityIdFromResponse } from "@mohsinonxrm/dataverse-sdk-core";

/** The headers that can carry the created record's URL, in the order core reads them. */
const ID_HEADERS = ["odata-entityid", "location"];

/**
 * The record id from one response of a `$batch`: the `OData-EntityId` header (or `Location`) of
 * a create, e.g. `https://org.crm.dynamics.com/api/data/v9.2/accounts(00000000-…)` →
 * `"00000000-…"`. The batch counterpart of `entityIdFromResponse` from
 * `@mohsinonxrm/dataverse-sdk-core`, which takes a `Response`.
 *
 * Accepts a `BatchResponseStep` (from `execute()`) or a `BatchResponsePart` (from
 * `decodeBatchResponse()`). Header names are matched case-insensitively.
 *
 * @param part - A batch response step or part
 * @returns The record id (a GUID)
 * @throws {DataverseInvalidRequestError} When neither header holds an id, e.g. the request was
 *   not a create, or the URL names the record by an alternate key
 *
 * @example
 * ```typescript
 * batch.beginChangeset();
 * batch.addRequest("acct", "POST", "accounts", undefined, { name: "Contoso" });
 * batch.endChangeset();
 * const result = await batch.execute();
 * const accountId = entityIdFromBatchResponse(result.responses.get("acct")!);
 * ```
 */
export function entityIdFromBatchResponse(part: { headers: Record<string, string> }): string {
  const headers = new Headers();
  for (const [name, value] of Object.entries(part.headers)) {
    if (!ID_HEADERS.includes(name.toLowerCase())) continue;
    try {
      headers.set(name, value);
    } catch {
      // A value `Headers` rejects (non-Latin-1 text) is not a record URL; treat it as absent.
    }
  }
  return entityIdFromResponse(new Response(null, { headers }));
}
