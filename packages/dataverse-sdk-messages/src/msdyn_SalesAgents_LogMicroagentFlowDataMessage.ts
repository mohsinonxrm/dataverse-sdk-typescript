import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_LogMicroagentFlowDataResponse as msdyn_SalesAgents_LogMicroagentFlowDataResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_LogMicroagentFlowData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_LogMicroagentFlowDataRequestParameters {
  msdyn_salesagentrunid: string;
  msdyn_agenttype: number;
  msdyn_salesagenttype?: number;
  trackingId?: string;
  continueOnError?: boolean;
  data: string;
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
      msdyn_salesagentrunid: this.Parameters.msdyn_salesagentrunid,
      msdyn_agenttype: this.Parameters.msdyn_agenttype,
      msdyn_salesagenttype: this.Parameters.msdyn_salesagenttype,
      trackingId: this.Parameters.trackingId,
      continueOnError: this.Parameters.continueOnError,
      data: this.Parameters.data,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_LogMicroagentFlowDataResponse.fromResponse({});
    return msdyn_SalesAgents_LogMicroagentFlowDataResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_LogMicroagentFlowData response message
 */
export class msdyn_SalesAgents_LogMicroagentFlowDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_LogMicroagentFlowDataResponseData) {
    super("msdyn_SalesAgents_LogMicroagentFlowData");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_LogMicroagentFlowDataResponse {
    return new msdyn_SalesAgents_LogMicroagentFlowDataResponse(
      responseObject<msdyn_SalesAgents_LogMicroagentFlowDataResponseData>(data)
    );
  }
}
