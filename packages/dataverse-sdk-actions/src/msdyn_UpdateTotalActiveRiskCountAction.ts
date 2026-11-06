import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateTotalActiveRiskCount action
 */
export interface msdyn_UpdateTotalActiveRiskCountResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_UpdateTotalActiveRiskCount action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateTotalActiveRiskCountActionParameters {
  OpportunityId: string;
}

/**
 * msdyn_UpdateTotalActiveRiskCount action
 *
 * Unbound action
 */
export class msdyn_UpdateTotalActiveRiskCountAction implements Executable<msdyn_UpdateTotalActiveRiskCountResponse> {
  constructor(public readonly parameters: msdyn_UpdateTotalActiveRiskCountActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateTotalActiveRiskCount`;

    const body = requestBody({
      OpportunityId: this.parameters.OpportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateTotalActiveRiskCountResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdateTotalActiveRiskCountResponse;
    return (await response.json()) as msdyn_UpdateTotalActiveRiskCountResponse;
  }
}
