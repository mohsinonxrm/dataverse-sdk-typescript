import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_CreateSARBasedOnPreviousAgent action
 */
export interface msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse {
  // No content returned
}

/**
 * msdyn_SalesAgents_CreateSARBasedOnPreviousAgent action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_CreateSARBasedOnPreviousAgentAction implements Executable<msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse> {
  constructor(
    public readonly msdyn_SalesAgentType: number,
    public readonly msdyn_PreviousSarRecordId: string,
    public readonly msdyn_TrackingId?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARBasedOnPreviousAgent`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_PreviousSarRecordId: this.msdyn_PreviousSarRecordId,
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
  ): Promise<msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse> {
    // No return value (204 No Content)
    return {};
  }
}
