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

/**
 * The record id from a create response's `OData-EntityId` header (or `Location`), e.g.
 * `https://org.crm.dynamics.com/api/data/v9.2/accounts(00000000-…)` → `"00000000-…"`.
 * Throws `DataverseInvalidRequestError` when neither header holds an id.
 */
export function entityIdFromResponse(res: Response): string {
  const header = res.headers.get("odata-entityid") ?? res.headers.get("location") ?? "";
  const match = /\(([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\)\s*$/i.exec(
    header
  );
  if (!match?.[1]) {
    throw DataverseInvalidRequestError.missingParameter("OData-EntityId response header");
  }
  return match[1];
}
