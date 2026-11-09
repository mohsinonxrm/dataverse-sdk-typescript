import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_GetOutreachSalesAgentRunRecords message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsRequestParameters {
  msdyn_TrackingId: string;
}

/**
 * msdyn_SalesAgents_GetOutreachSalesAgentRunRecords request message
 *
 * Web API Action: msdyn_SalesAgents_GetOutreachSalesAgentRunRecords
 */
export class msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsRequestParameters) {
    super("msdyn_SalesAgents_GetOutreachSalesAgentRunRecords", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetOutreachSalesAgentRunRecords`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
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
    return msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_GetOutreachSalesAgentRunRecords action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResult {
  "@odata.context"?: string;
  msdyn_OutreachConfig: string;
  msdyn_Response: string;
}

/**
 * msdyn_SalesAgents_GetOutreachSalesAgentRunRecords response message
 *
 * `result` is the value the msdyn_SalesAgents_GetOutreachSalesAgentRunRecords action returns (see {@link msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResult}).
 */
export class msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResult) {
    super("msdyn_SalesAgents_GetOutreachSalesAgentRunRecords");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse {
    return new msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse(
      data as msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResult
    );
  }
}
