import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse as msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_SalesAgents_GetOutreachSalesAgentRunRecords response message
 */
export class msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponseData) {
    super("msdyn_SalesAgents_GetOutreachSalesAgentRunRecords");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse {
    return new msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse(
      responseObject<msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponseData>(data)
    );
  }
}
