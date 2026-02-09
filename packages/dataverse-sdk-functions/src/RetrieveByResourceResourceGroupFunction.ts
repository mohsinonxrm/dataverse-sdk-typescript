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
    const data = await response.json();
    return data as RetrieveByResourceResourceGroupResponse;
  }
}
