import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { resourcegroup } from "./types/index.js";

/**
 * Response from FindParentResourceGroup function
 */
export interface FindParentResourceGroupResponse {
  result: boolean;
}

/**
 * FindParentResourceGroup function
 *
 * Bound function
 * Binding parameter: entity (mscrm.resourcegroup)
 */
export class FindParentResourceGroupFunction implements Executable<FindParentResourceGroupResponse> {
  constructor(
    public readonly resourcegroupId: string,
    public readonly children: resourcegroup[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/resourcegroups(${this.resourcegroupId})/Microsoft.Dynamics.CRM.FindParentResourceGroup`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.children !== undefined) {
      aliases.push(`Children=@p1`);
      params.append("@p1", JSON.stringify(this.children));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<FindParentResourceGroupResponse> {
    const data = await response.json();
    return data as FindParentResourceGroupResponse;
  }
}
