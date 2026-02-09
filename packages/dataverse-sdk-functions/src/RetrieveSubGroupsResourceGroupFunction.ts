import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { resourcegroup } from "./types/index.js";

/**
 * Response from RetrieveSubGroupsResourceGroup function
 */
export interface RetrieveSubGroupsResourceGroupResponse {
  value: resourcegroup[];
}

/**
 * RetrieveSubGroupsResourceGroup function
 *
 * Bound function
 * Binding parameter: entity (mscrm.resourcegroup)
 */
export class RetrieveSubGroupsResourceGroupFunction implements Executable<RetrieveSubGroupsResourceGroupResponse> {
  constructor(public readonly resourcegroupId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/resourcegroups(${this.resourcegroupId})/Microsoft.Dynamics.CRM.RetrieveSubGroupsResourceGroup`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveSubGroupsResourceGroupResponse> {
    const data = await response.json();
    return data as RetrieveSubGroupsResourceGroupResponse;
  }
}
