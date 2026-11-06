import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_CompleteOrchestration action
 */
export interface msdyn_SalesAgents_CompleteOrchestrationResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SalesAgents_CompleteOrchestration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_CompleteOrchestrationActionParameters {
  msdyn_SarRecordId: string;
  msdyn_TrackingId?: string;
  msdyn_SalesAgentType: number;
}

/**
 * msdyn_SalesAgents_CompleteOrchestration action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_CompleteOrchestrationAction implements Executable<msdyn_SalesAgents_CompleteOrchestrationResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_CompleteOrchestrationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CompleteOrchestration`;

    const body = requestBody({
      msdyn_SarRecordId: this.parameters.msdyn_SarRecordId,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_SalesAgentType: this.parameters.msdyn_SalesAgentType,
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
  ): Promise<msdyn_SalesAgents_CompleteOrchestrationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_CompleteOrchestrationResponse;
    return (await response.json()) as msdyn_SalesAgents_CompleteOrchestrationResponse;
  }
}
