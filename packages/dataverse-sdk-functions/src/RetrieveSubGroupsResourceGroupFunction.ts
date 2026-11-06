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
 *
 * The first argument is the id of the resourcegroup record to call it on.
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveSubGroupsResourceGroupResponse;
    return (await response.json()) as RetrieveSubGroupsResourceGroupResponse;
  }
}
