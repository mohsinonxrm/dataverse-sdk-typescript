import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { businessunit } from "./types/index.js";

/**
 * Response from the RetrieveBusinessHierarchyBusinessUnit function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveBusinessHierarchyBusinessUnitResponse = Array<
  businessunit & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveBusinessHierarchyBusinessUnit function
 *
 * Bound function
 * Binding parameter: entity (mscrm.businessunit)
 *
 * The first argument is the id of the businessunit record to call it on.
 */
export class RetrieveBusinessHierarchyBusinessUnitFunction implements Executable<RetrieveBusinessHierarchyBusinessUnitResponse> {
  constructor(public readonly businessunitId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/businessunits(${this.businessunitId})/Microsoft.Dynamics.CRM.RetrieveBusinessHierarchyBusinessUnit`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveBusinessHierarchyBusinessUnitResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveBusinessHierarchyBusinessUnitResponse })
      .value;
  }
}
