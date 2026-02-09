import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_CompleteOrchestration action
 */
export interface msdyn_SalesAgents_CompleteOrchestrationResponse {
  // No content returned
}

/**
 * msdyn_SalesAgents_CompleteOrchestration action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_CompleteOrchestrationAction implements Executable<msdyn_SalesAgents_CompleteOrchestrationResponse> {
  constructor(
    public readonly msdyn_SarRecordId: string,
    public readonly msdyn_TrackingId: string,
    public readonly msdyn_SalesAgentType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CompleteOrchestration`;

    const body: Record<string, unknown> = {
      msdyn_SarRecordId: this.msdyn_SarRecordId,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
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
  ): Promise<msdyn_SalesAgents_CompleteOrchestrationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
