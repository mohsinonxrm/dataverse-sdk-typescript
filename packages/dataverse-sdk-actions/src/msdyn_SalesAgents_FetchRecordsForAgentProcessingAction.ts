import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_FetchRecordsForAgentProcessing action
 */
export interface msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse {
  msdyn_Records: string;
  msdyn_ODataNextLink: string;
}

/**
 * msdyn_SalesAgents_FetchRecordsForAgentProcessing action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_FetchRecordsForAgentProcessingAction implements Executable<msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse> {
  constructor(
    public readonly msdyn_Top: number,
    public readonly msdyn_SalesAgentType: number,
    public readonly msdyn_NextLink: string,
    public readonly msdyn_TrackingId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchRecordsForAgentProcessing`;

    const body: Record<string, unknown> = {
      msdyn_Top: this.msdyn_Top,
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_NextLink: this.msdyn_NextLink,
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
  ): Promise<msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse;
  }
}
