import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetResourceGroupMemberships action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourceGroupMembershipsResponse {
  "@odata.context"?: string;
  GroupMemberships: string;
}

/**
 * Parameters of the msdyn_GetResourceGroupMemberships action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourceGroupMembershipsActionParameters {
  Start: string;
  End: string;
  ResourceIds: string;
}

/**
 * msdyn_GetResourceGroupMemberships action
 *
 * Unbound action
 */
export class msdyn_GetResourceGroupMembershipsAction implements Executable<msdyn_GetResourceGroupMembershipsResponse> {
  constructor(public readonly parameters: msdyn_GetResourceGroupMembershipsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceGroupMemberships`;

    const body = requestBody({
      Start: this.parameters.Start,
      End: this.parameters.End,
      ResourceIds: this.parameters.ResourceIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceGroupMembershipsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetResourceGroupMembershipsResponse;
  }
}
