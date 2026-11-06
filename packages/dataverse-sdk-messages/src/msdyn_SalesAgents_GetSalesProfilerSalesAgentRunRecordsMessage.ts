import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse as msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsRequestParameters {
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords request message
 *
 * Web API Action: msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords
 */
export class msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsRequestParameters>;

  constructor(
    parameters: msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsRequestParameters = {}
  ) {
    super("msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords`;

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
  ): Promise<msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse.fromResponse({});
    return msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords response message
 */
export class msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponseData) {
    super("msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse {
    return new msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse(
      responseObject<msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponseData>(data)
    );
  }
}
