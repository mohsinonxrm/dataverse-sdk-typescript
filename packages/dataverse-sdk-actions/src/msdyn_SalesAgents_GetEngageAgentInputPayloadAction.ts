import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_GetEngageAgentInputPayload action
 */
export interface msdyn_SalesAgents_GetEngageAgentInputPayloadResponse {
  msdyn_Thread: string;
  msdyn_EngageAgentInput: string;
}

/**
 * Parameters of the msdyn_SalesAgents_GetEngageAgentInputPayload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetEngageAgentInputPayloadActionParameters {
  msdyn_Thread?: string;
  msdyn_SalesAgentRun?: string;
  msdyn_SalesMacroAgentType: number;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_GetEngageAgentInputPayload action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetEngageAgentInputPayloadAction implements Executable<msdyn_SalesAgents_GetEngageAgentInputPayloadResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_GetEngageAgentInputPayloadActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetEngageAgentInputPayload`;

    const body = requestBody({
      msdyn_Thread: this.parameters.msdyn_Thread,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_SalesMacroAgentType: this.parameters.msdyn_SalesMacroAgentType,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_GetEngageAgentInputPayloadResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesAgents_GetEngageAgentInputPayloadResponse;
  }
}
