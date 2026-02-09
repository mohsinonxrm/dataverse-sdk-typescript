import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { resourcegroup } from "./types/index.js";

/**
 * Response from RetrieveParentGroupsResourceGroup function
 */
export interface RetrieveParentGroupsResourceGroupResponse {
  value: resourcegroup[];
}

/**
 * RetrieveParentGroupsResourceGroup function
 *
 * Unbound function
 */
export class RetrieveParentGroupsResourceGroupFunction implements Executable<RetrieveParentGroupsResourceGroupResponse> {
  constructor(public readonly resourceGroupId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveParentGroupsResourceGroup`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.resourceGroupId !== undefined) {
      aliases.push(`ResourceGroupId=@p1`);
      params.append(
        "@p1",
        typeof this.resourceGroupId === "string"
          ? `'${this.resourceGroupId}'`
          : String(this.resourceGroupId)
      );
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

  async parseResponse(response: Response): Promise<RetrieveParentGroupsResourceGroupResponse> {
    const data = await response.json();
    return data as RetrieveParentGroupsResourceGroupResponse;
  }
}
