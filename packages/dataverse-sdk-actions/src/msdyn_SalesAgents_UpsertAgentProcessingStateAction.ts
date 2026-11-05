import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_UpsertAgentProcessingState action
 */
export interface msdyn_SalesAgents_UpsertAgentProcessingStateResponse {
  // No content returned
}

/**
 * msdyn_SalesAgents_UpsertAgentProcessingState action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_UpsertAgentProcessingStateAction implements Executable<msdyn_SalesAgents_UpsertAgentProcessingStateResponse> {
  constructor(
    public readonly msdyn_Records: Record<string, unknown>[],
    public readonly msdyn_SalesAgentType: number,
    public readonly msdyn_TrackingId: string,
    public readonly msdyn_SkipVersionNumberUpdate: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_UpsertAgentProcessingState`;

    const body: Record<string, unknown> = {
      msdyn_Records: this.msdyn_Records,
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SkipVersionNumberUpdate: this.msdyn_SkipVersionNumberUpdate,
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
  ): Promise<msdyn_SalesAgents_UpsertAgentProcessingStateResponse> {
    // No return value (204 No Content)
    return {};
  }
}
