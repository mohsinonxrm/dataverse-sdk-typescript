import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResult {
  "@odata.context"?: string;
  msdyn_ProfilerSARs: string;
}

/**
 * msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords response message
 *
 * `result` is the value the msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords action returns (see {@link msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResult}).
 */
export class msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResult) {
    super("msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecords");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse {
    return new msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse(
      data as msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResult
    );
  }
}
