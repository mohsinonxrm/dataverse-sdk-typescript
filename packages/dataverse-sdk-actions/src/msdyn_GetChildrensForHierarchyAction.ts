import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetChildrensForHierarchy action
 */
export interface msdyn_GetChildrensForHierarchyResponse {
  msdyn_AgentGroupToHierarchy: string;
}

/**
 * Parameters of the msdyn_GetChildrensForHierarchy action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetChildrensForHierarchyActionParameters {
  msdyn_AgentGroupRequest: string;
}

/**
 * msdyn_GetChildrensForHierarchy action
 *
 * Unbound action
 */
export class msdyn_GetChildrensForHierarchyAction implements Executable<msdyn_GetChildrensForHierarchyResponse> {
  constructor(public readonly parameters: msdyn_GetChildrensForHierarchyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetChildrensForHierarchy`;

    const body = requestBody({
      msdyn_AgentGroupRequest: this.parameters.msdyn_AgentGroupRequest,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetChildrensForHierarchyResponse;
  }
}
