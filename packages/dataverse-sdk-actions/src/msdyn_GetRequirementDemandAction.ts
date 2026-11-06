import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetRequirementDemand action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRequirementDemandResponse {
  "@odata.context"?: string;
  RequirementsToDemandMap: string;
}

/**
 * Parameters of the msdyn_GetRequirementDemand action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRequirementDemandActionParameters {
  RequirementIds: string;
}

/**
 * msdyn_GetRequirementDemand action
 *
 * Unbound action
 */
export class msdyn_GetRequirementDemandAction implements Executable<msdyn_GetRequirementDemandResponse> {
  constructor(public readonly parameters: msdyn_GetRequirementDemandActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementDemand`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementDemandResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetRequirementDemandResponse;
  }
}
