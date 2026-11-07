import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_LogMicroagentFlowData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_LogMicroagentFlowDataRequestParameters {
  msdyn_agenttype: number;
  msdyn_salesagenttype?: number;
  msdyn_salesagentrunid: string;
  continueOnError?: boolean;
  data: string;
  trackingId?: string;
}

/**
 * msdyn_SalesAgents_LogMicroagentFlowData request message
 *
 * Web API Action: msdyn_SalesAgents_LogMicroagentFlowData
 */
export class msdyn_SalesAgents_LogMicroagentFlowDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_LogMicroagentFlowDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_LogMicroagentFlowDataRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_LogMicroagentFlowDataRequestParameters) {
    super("msdyn_SalesAgents_LogMicroagentFlowData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_LogMicroagentFlowData`;

    const body = requestBody({
      msdyn_agenttype: this.Parameters.msdyn_agenttype,
      msdyn_salesagenttype: this.Parameters.msdyn_salesagenttype,
      msdyn_salesagentrunid: this.Parameters.msdyn_salesagentrunid,
      continueOnError: this.Parameters.continueOnError,
      data: this.Parameters.data,
      trackingId: this.Parameters.trackingId,
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
  ): Promise<msdyn_SalesAgents_LogMicroagentFlowDataResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_LogMicroagentFlowDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_LogMicroagentFlowData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_LogMicroagentFlowDataResult {
  "@odata.context"?: string;
  errorMessage: string;
  isSuccess: boolean;
}

/**
 * msdyn_SalesAgents_LogMicroagentFlowData response message
 *
 * `result` is the value the msdyn_SalesAgents_LogMicroagentFlowData action returns (see {@link msdyn_SalesAgents_LogMicroagentFlowDataResult}).
 */
export class msdyn_SalesAgents_LogMicroagentFlowDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_LogMicroagentFlowDataResult) {
    super("msdyn_SalesAgents_LogMicroagentFlowData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_LogMicroagentFlowDataResponse {
    return new msdyn_SalesAgents_LogMicroagentFlowDataResponse(
      data as msdyn_SalesAgents_LogMicroagentFlowDataResult
    );
  }
}
