import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_GetOutreachSalesAgentRunRecords action
 */
export interface msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse {
  msdyn_OutreachConfig: string;
  msdyn_Response: string;
}

/**
 * msdyn_SalesAgents_GetOutreachSalesAgentRunRecords action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsAction implements Executable<msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse> {
  constructor(public readonly msdyn_TrackingId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetOutreachSalesAgentRunRecords`;

    const body: Record<string, unknown> = {
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
  ): Promise<msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse;
  }
}
