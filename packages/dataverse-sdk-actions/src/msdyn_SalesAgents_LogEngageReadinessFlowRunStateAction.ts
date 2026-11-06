import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_LogEngageReadinessFlowRunState action
 */
export interface msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse {
  // No content returned
}

/**
 * msdyn_SalesAgents_LogEngageReadinessFlowRunState action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_LogEngageReadinessFlowRunStateAction implements Executable<msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse> {
  constructor(
    public readonly msdyn_TrackingId?: string,
    public readonly msdyn_SalesAgentRun?: string,
    public readonly msdyn_Thread?: string,
    public readonly msdyn_FlowRunState?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_LogEngageReadinessFlowRunState`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_Thread: this.msdyn_Thread,
      msdyn_FlowRunState: this.msdyn_FlowRunState,
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
  ): Promise<msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse> {
    // No return value (204 No Content)
    return {};
  }
}
