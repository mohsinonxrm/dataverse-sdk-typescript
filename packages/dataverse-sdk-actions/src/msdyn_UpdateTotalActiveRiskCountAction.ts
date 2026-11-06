import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateTotalActiveRiskCount action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateTotalActiveRiskCountResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_UpdateTotalActiveRiskCountResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
