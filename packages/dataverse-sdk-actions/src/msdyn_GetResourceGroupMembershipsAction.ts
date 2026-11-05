import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetResourceGroupMemberships action
 */
export interface msdyn_GetResourceGroupMembershipsResponse {
  GroupMemberships: string;
}

/**
 * msdyn_GetResourceGroupMemberships action
 *
 * Unbound action
 */
export class msdyn_GetResourceGroupMembershipsAction implements Executable<msdyn_GetResourceGroupMembershipsResponse> {
  constructor(
    public readonly start: string,
    public readonly end: string,
    public readonly resourceIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceGroupMemberships`;

    const body: Record<string, unknown> = {
      Start: this.start,
      End: this.end,
      ResourceIds: this.resourceIds,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetResourceGroupMembershipsResponse> {
    const data = await response.json();
    return data as msdyn_GetResourceGroupMembershipsResponse;
  }
}
