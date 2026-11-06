import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetChildrensForHierarchy action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetChildrensForHierarchyResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetChildrensForHierarchyResponse;
  }
}
