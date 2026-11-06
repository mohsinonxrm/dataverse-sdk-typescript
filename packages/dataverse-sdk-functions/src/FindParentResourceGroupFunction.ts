import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { resourcegroup } from "./types/index.js";

/**
 * Response from FindParentResourceGroup function
 */
export interface FindParentResourceGroupResponse {
  result: boolean;
}

/**
 * Parameters of the FindParentResourceGroup function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FindParentResourceGroupFunctionParameters {
  Children: resourcegroup[];
}

/**
 * FindParentResourceGroup function
 *
 * Bound function
 * Binding parameter: entity (mscrm.resourcegroup)
 *
 * The first argument is the id of the resourcegroup record to call it on.
 */
export class FindParentResourceGroupFunction implements Executable<FindParentResourceGroupResponse> {
  constructor(
    public readonly resourcegroupId: string,
    public readonly parameters: FindParentResourceGroupFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/resourcegroups(${this.resourcegroupId})/Microsoft.Dynamics.CRM.FindParentResourceGroup`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Children !== undefined) {
      aliases.push(`Children=@p1`);
      params.append("@p1", JSON.stringify(this.parameters.Children));
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as FindParentResourceGroupResponse;
  }
}
