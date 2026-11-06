import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_BatchUpdateSARStates action
 */
export interface msdyn_SalesAgents_BatchUpdateSARStatesResponse {
  // No content returned
}

/**
 * msdyn_SalesAgents_BatchUpdateSARStates action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_BatchUpdateSARStatesAction implements Executable<msdyn_SalesAgents_BatchUpdateSARStatesResponse> {
  constructor(
    public readonly msdyn_StateCode: number,
    public readonly msdyn_StatusCode: number,
    public readonly msdyn_TrackingId: string | undefined,
    public readonly msdyn_SalesAgentRunIds: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_BatchUpdateSARStates`;

    const body: Record<string, unknown> = {
      msdyn_StateCode: this.msdyn_StateCode,
      msdyn_StatusCode: this.msdyn_StatusCode,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRunIds: this.msdyn_SalesAgentRunIds,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_BatchUpdateSARStatesResponse> {
    // No return value (204 No Content)
    return {};
  }
}
