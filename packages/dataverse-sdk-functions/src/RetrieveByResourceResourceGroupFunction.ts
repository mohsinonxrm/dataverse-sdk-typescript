import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { resourcegroup } from "./types/index.js";

/**
 * Response from RetrieveByResourceResourceGroup function
 */
export interface RetrieveByResourceResourceGroupResponse {
  value: resourcegroup[];
}

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveByResourceResourceGroupResponse;
    return (await response.json()) as RetrieveByResourceResourceGroupResponse;
  }
}
