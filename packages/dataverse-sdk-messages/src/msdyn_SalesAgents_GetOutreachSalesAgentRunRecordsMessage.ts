import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_GetOutreachSalesAgentRunRecords request message
 *
 * Web API Action: msdyn_SalesAgents_GetOutreachSalesAgentRunRecords
 */
export class msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse>
{
  constructor(public msdyn_TrackingId: string) {
    super("msdyn_SalesAgents_GetOutreachSalesAgentRunRecords");
  }

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
    return msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_TrackingId: this.msdyn_TrackingId,
    };
  }
}

/**
 * msdyn_SalesAgents_GetOutreachSalesAgentRunRecords response message
 */
export class msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse) {
    super("msdyn_SalesAgents_GetOutreachSalesAgentRunRecords");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse {
    return new msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse((data as any).value);
  }
}
