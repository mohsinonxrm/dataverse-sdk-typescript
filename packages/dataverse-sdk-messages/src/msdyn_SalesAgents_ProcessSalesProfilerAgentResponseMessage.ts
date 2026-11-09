import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_ProcessSalesProfilerAgentResponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ProcessSalesProfilerAgentResponseRequestParameters {
  msdyn_CompanyWebsite?: string;
  msdyn_SalesAgentRun: string;
  msdyn_CompanyName?: string;
  msdyn_SalesAgentRunId?: string;
}

/**
 * msdyn_SalesAgents_ProcessSalesProfilerAgentResponse request message
 *
 * Web API Action: msdyn_SalesAgents_ProcessSalesProfilerAgentResponse
 */
export class msdyn_SalesAgents_ProcessSalesProfilerAgentResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ProcessSalesProfilerAgentResponseRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ProcessSalesProfilerAgentResponseRequestParameters) {
    super("msdyn_SalesAgents_ProcessSalesProfilerAgentResponse", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessSalesProfilerAgentResponse`;

    const body = requestBody({
      msdyn_CompanyWebsite: this.Parameters.msdyn_CompanyWebsite,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_CompanyName: this.Parameters.msdyn_CompanyName,
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
  ): Promise<msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_ProcessSalesProfilerAgentResponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResult {
  "@odata.context"?: string;
  msdyn_IsSuccess: boolean;
}

/**
 * msdyn_SalesAgents_ProcessSalesProfilerAgentResponse response message
 *
 * `result` is the value the msdyn_SalesAgents_ProcessSalesProfilerAgentResponse action returns (see {@link msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResult}).
 */
export class msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResult) {
    super("msdyn_SalesAgents_ProcessSalesProfilerAgentResponse");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResponse {
    return new msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResponse(
      data as msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResult
    );
  }
}
