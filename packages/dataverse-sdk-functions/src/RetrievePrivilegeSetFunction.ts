import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { privilege } from "./types/index.js";

/**
 * Response from the RetrievePrivilegeSet function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrievePrivilegeSetResponse = Array<
  privilege & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrievePrivilegeSet function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.privilege))
 */
export class RetrievePrivilegeSetFunction implements Executable<RetrievePrivilegeSetResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/privileges/Microsoft.Dynamics.CRM.RetrievePrivilegeSet`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrievePrivilegeSetResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrievePrivilegeSetResponse }).value;
  }
}
