import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_ShouldRunAgentOrchestration action
 */
export interface msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse {
  msdyn_ShouldRun: boolean;
}

/**
 * msdyn_SalesAgents_ShouldRunAgentOrchestration action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ShouldRunAgentOrchestrationAction implements Executable<msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse> {
  constructor(
    public readonly msdyn_SalesAgentType: number,
    public readonly msdyn_TrackingId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ShouldRunAgentOrchestration`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse;
  }
}
