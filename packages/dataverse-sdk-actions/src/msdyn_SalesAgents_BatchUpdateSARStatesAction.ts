import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_BatchUpdateSARStates action
 */
export interface msdyn_SalesAgents_BatchUpdateSARStatesResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SalesAgents_BatchUpdateSARStates action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_BatchUpdateSARStatesActionParameters {
  msdyn_StateCode: number;
  msdyn_StatusCode: number;
  msdyn_TrackingId?: string;
  msdyn_SalesAgentRunIds: string[];
}

/**
 * msdyn_SalesAgents_BatchUpdateSARStates action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_BatchUpdateSARStatesAction implements Executable<msdyn_SalesAgents_BatchUpdateSARStatesResponse> {
  constructor(public readonly parameters: msdyn_SalesAgents_BatchUpdateSARStatesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_BatchUpdateSARStates`;

    const body = requestBody({
      msdyn_StateCode: this.parameters.msdyn_StateCode,
      msdyn_StatusCode: this.parameters.msdyn_StatusCode,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_SalesAgentRunIds: this.parameters.msdyn_SalesAgentRunIds,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_BatchUpdateSARStatesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesAgents_BatchUpdateSARStatesResponse;
  }
}
