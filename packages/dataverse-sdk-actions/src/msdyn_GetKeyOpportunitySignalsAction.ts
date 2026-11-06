import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetKeyOpportunitySignals action
 */
export interface msdyn_GetKeyOpportunitySignalsResponse {
  ErrorMessage: string;
  IsSuccess: boolean;
  Result: string;
}

/**
 * Parameters of the msdyn_GetKeyOpportunitySignals action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKeyOpportunitySignalsActionParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetKeyOpportunitySignals action
 *
 * Unbound action
 */
export class msdyn_GetKeyOpportunitySignalsAction implements Executable<msdyn_GetKeyOpportunitySignalsResponse> {
  constructor(public readonly parameters: msdyn_GetKeyOpportunitySignalsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKeyOpportunitySignals`;

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

  async parseResponse(response: Response): Promise<msdyn_GetKeyOpportunitySignalsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetKeyOpportunitySignalsResponse;
    return (await response.json()) as msdyn_GetKeyOpportunitySignalsResponse;
  }
}
