import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetChildrensForHierarchy action
 */
export interface msdyn_GetChildrensForHierarchyResponse {
  msdyn_AgentGroupToHierarchy: string;
}

/**
 * msdyn_GetChildrensForHierarchy action
 *
 * Unbound action
 */
export class msdyn_GetChildrensForHierarchyAction implements Executable<msdyn_GetChildrensForHierarchyResponse> {
  constructor(public readonly msdyn_AgentGroupRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetChildrensForHierarchy`;

    const body: Record<string, unknown> = {
      msdyn_AgentGroupRequest: this.msdyn_AgentGroupRequest,
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

  async parseResponse(response: Response): Promise<msdyn_GetChildrensForHierarchyResponse> {
    const data = await response.json();
    return data as msdyn_GetChildrensForHierarchyResponse;
  }
}
