import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_HandoverInitiate action
 */
export interface msdyn_SalesAgents_HandoverInitiateResponse {
  HandoverInitiateResponse: string;
}

/**
 * Parameters of the msdyn_SalesAgents_HandoverInitiate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_HandoverInitiateActionParameters {
  msdyn_AssignTo?: number;
  msdyn_HandoverIntent?: number;
  msdyn_GetHandoverDetailsInfo?: string;
  msdyn_SalesAgentRun: string;
  msdyn_HandoverTarget?: number;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_HandoverInitiate action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_HandoverInitiateAction implements Executable<msdyn_SalesAgents_HandoverInitiateResponse> {
  constructor(public readonly parameters: msdyn_SalesAgents_HandoverInitiateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_HandoverInitiate`;

    const body = requestBody({
      msdyn_AssignTo: this.parameters.msdyn_AssignTo,
      msdyn_HandoverIntent: this.parameters.msdyn_HandoverIntent,
      msdyn_GetHandoverDetailsInfo: this.parameters.msdyn_GetHandoverDetailsInfo,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_HandoverTarget: this.parameters.msdyn_HandoverTarget,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_HandoverInitiateResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesAgents_HandoverInitiateResponse;
  }
}
