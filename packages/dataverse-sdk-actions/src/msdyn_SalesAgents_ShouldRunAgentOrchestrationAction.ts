import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_ShouldRunAgentOrchestration action
 */
export interface msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse {
  msdyn_ShouldRun: boolean;
}

/**
 * Parameters of the msdyn_SalesAgents_ShouldRunAgentOrchestration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ShouldRunAgentOrchestrationActionParameters {
  msdyn_SalesAgentType: number;
  msdyn_TrackingId?: string;
  msdyn_AgentProfileId?: string;
}

/**
 * msdyn_SalesAgents_ShouldRunAgentOrchestration action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ShouldRunAgentOrchestrationAction implements Executable<msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_ShouldRunAgentOrchestrationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ShouldRunAgentOrchestration`;

    const body = requestBody({
      msdyn_SalesAgentType: this.parameters.msdyn_SalesAgentType,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_AgentProfileId: this.parameters.msdyn_AgentProfileId,
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
  ): Promise<msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse;
    return (await response.json()) as msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse;
  }
}
