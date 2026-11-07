import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_GetOutreachSalesAgentRunRecords action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse {
  "@odata.context"?: string;
  msdyn_OutreachConfig: string;
  msdyn_Response: string;
}

/**
 * Parameters of the msdyn_SalesAgents_GetOutreachSalesAgentRunRecords action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsActionParameters {
  msdyn_TrackingId: string;
}

/**
 * msdyn_SalesAgents_GetOutreachSalesAgentRunRecords action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsAction implements Executable<msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetOutreachSalesAgentRunRecords`;

    const body = requestBody({
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
    });

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse;
  }
}
