import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetOpportunityHealth action
 */
export interface msdyn_GetOpportunityHealthResponse {
  ErrorMessage: string;
  IsSuccess: boolean;
  Result: string;
}

/**
 * Parameters of the msdyn_GetOpportunityHealth action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOpportunityHealthActionParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetOpportunityHealth action
 *
 * Unbound action
 */
export class msdyn_GetOpportunityHealthAction implements Executable<msdyn_GetOpportunityHealthResponse> {
  constructor(public readonly parameters: msdyn_GetOpportunityHealthActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityHealth`;

    const body = requestBody({
      msdyn_OpportunityId: this.parameters.msdyn_OpportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityHealthResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetOpportunityHealthResponse;
    return (await response.json()) as msdyn_GetOpportunityHealthResponse;
  }
}
