import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetRequirementDependencySet action
 */
export interface msdyn_GetRequirementDependencySetResponse {
  RequirementDependencySet: string;
}

/**
 * Parameters of the msdyn_GetRequirementDependencySet action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRequirementDependencySetActionParameters {
  Version?: string;
  RequirementIds: string;
}

/**
 * msdyn_GetRequirementDependencySet action
 *
 * Unbound action
 */
export class msdyn_GetRequirementDependencySetAction implements Executable<msdyn_GetRequirementDependencySetResponse> {
  constructor(public readonly parameters: msdyn_GetRequirementDependencySetActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementDependencySet`;

    const body = requestBody({
      Version: this.parameters.Version,
      RequirementIds: this.parameters.RequirementIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementDependencySetResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetRequirementDependencySetResponse;
    return (await response.json()) as msdyn_GetRequirementDependencySetResponse;
  }
}
