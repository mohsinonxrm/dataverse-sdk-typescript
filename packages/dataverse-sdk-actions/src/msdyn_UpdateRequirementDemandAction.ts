import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateRequirementDemand action
 */
export interface msdyn_UpdateRequirementDemandResponse {
  PersistedRequirementDemandContext: string;
}

/**
 * Parameters of the msdyn_UpdateRequirementDemand action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateRequirementDemandActionParameters {
  RequirementDemandContext: string;
}

/**
 * msdyn_UpdateRequirementDemand action
 *
 * Unbound action
 */
export class msdyn_UpdateRequirementDemandAction implements Executable<msdyn_UpdateRequirementDemandResponse> {
  constructor(public readonly parameters: msdyn_UpdateRequirementDemandActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRequirementDemand`;

    const body = requestBody({
      RequirementDemandContext: this.parameters.RequirementDemandContext,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateRequirementDemandResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdateRequirementDemandResponse;
    return (await response.json()) as msdyn_UpdateRequirementDemandResponse;
  }
}
