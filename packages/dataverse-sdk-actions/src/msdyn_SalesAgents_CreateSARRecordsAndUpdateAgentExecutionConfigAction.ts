import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig action
 */
export interface msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse {
  // No content returned
}

/**
 * msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigAction implements Executable<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse> {
  constructor(
    public readonly msdyn_SalesAgentType: number,
    public readonly msdyn_AgentExecutionConfigToUpdate: string,
    public readonly msdyn_SARRecordsToCreate: string,
    public readonly msdyn_TrackingId?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_AgentExecutionConfigToUpdate: this.msdyn_AgentExecutionConfigToUpdate,
      msdyn_SARRecordsToCreate: this.msdyn_SARRecordsToCreate,
      msdyn_TrackingId: this.msdyn_TrackingId,
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
  ): Promise<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse> {
    // No return value (204 No Content)
    return {};
  }
}
