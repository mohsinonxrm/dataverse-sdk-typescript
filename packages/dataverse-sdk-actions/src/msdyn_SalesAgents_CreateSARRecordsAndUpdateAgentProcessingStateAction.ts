import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState action
 */
export interface msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse {
  // No content returned
}

/**
 * msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateAction implements Executable<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse> {
  constructor(
    public readonly msdyn_TrackingId: string | undefined,
    public readonly msdyn_SARRecordsToCreate: string,
    public readonly msdyn_SalesAgentType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SARRecordsToCreate: this.msdyn_SARRecordsToCreate,
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
  ): Promise<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse> {
    // No return value (204 No Content)
    return {};
  }
}
