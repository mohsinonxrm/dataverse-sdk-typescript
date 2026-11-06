import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_IsOrchestrationComplete action
 */
export interface msdyn_SalesAgents_IsOrchestrationCompleteResponse {
  msdyn_IsOrchestrationComplete: boolean;
}

/**
 * msdyn_SalesAgents_IsOrchestrationComplete action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_IsOrchestrationCompleteAction implements Executable<msdyn_SalesAgents_IsOrchestrationCompleteResponse> {
  constructor(
    public readonly msdyn_TrackingId: string | undefined,
    public readonly msdyn_AgentType: number,
    public readonly msdyn_SalesAgentType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_IsOrchestrationComplete`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_AgentType: this.msdyn_AgentType,
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
    };

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
  ): Promise<msdyn_SalesAgents_IsOrchestrationCompleteResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_IsOrchestrationCompleteResponse;
  }
}
