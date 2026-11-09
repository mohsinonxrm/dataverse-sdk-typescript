import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2 message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2RequestParameters {
  msdyn_SalesAgentRun: string;
  msdyn_CompanyName?: string;
  msdyn_CompanyWebsite?: string;
  msdyn_SalesAgentRunId?: string;
}

/**
 * msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2 request message
 *
 * Web API Action: msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2
 */
export class msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Request
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Response>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2RequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2RequestParameters) {
    super("msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2`;

    const body = requestBody({
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_CompanyName: this.Parameters.msdyn_CompanyName,
      msdyn_CompanyWebsite: this.Parameters.msdyn_CompanyWebsite,
      msdyn_SalesAgentRunId: this.Parameters.msdyn_SalesAgentRunId,
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
  ): Promise<msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Response> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Response.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2 action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Result {
  "@odata.context"?: string;
  msdyn_IsSuccess: boolean;
}

/**
 * msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2 response message
 *
 * `result` is the value the msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2 action returns (see {@link msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Result}).
 */
export class msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Response extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Result) {
    super("msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Response {
    return new msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Response(
      data as msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Result
    );
  }
}
