import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { resourcegroup } from "./types/index.js";

/**
 * Response from the RetrieveByResourceResourceGroup function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveByResourceResourceGroupResponse = Array<
  resourcegroup & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveByResourceResourceGroup function
 *
 * Bound function
 * Binding parameter: entity (mscrm.resource)
 *
 * The first argument is the id of the resource record to call it on.
 */
export class RetrieveByResourceResourceGroupFunction implements Executable<RetrieveByResourceResourceGroupResponse> {
  constructor(public readonly resourceId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/resources(${this.resourceId})/Microsoft.Dynamics.CRM.RetrieveByResourceResourceGroup`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveByResourceResourceGroupResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveByResourceResourceGroupResponse }).value;
  }
}
