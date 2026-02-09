import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_FetchSARRecordsForAgentProcessing action
 */
export interface msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse {
  msdyn_Records: string;
}

/**
 * msdyn_SalesAgents_FetchSARRecordsForAgentProcessing action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_FetchSARRecordsForAgentProcessingAction implements Executable<msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse> {
  constructor(
    public readonly msdyn_SalesAgentType: number,
    public readonly msdyn_AgentType: number,
    public readonly msdyn_TrackingId: string,
    public readonly msdyn_Top: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchSARRecordsForAgentProcessing`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_AgentType: this.msdyn_AgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_Top: this.msdyn_Top,
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
  ): Promise<msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse;
  }
}
