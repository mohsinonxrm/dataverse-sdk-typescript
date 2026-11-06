import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_LogMicroagentFlowDataResponse as msdyn_SalesAgents_LogMicroagentFlowDataResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_LogMicroagentFlowData request message
 *
 * Web API Action: msdyn_SalesAgents_LogMicroagentFlowData
 */
export class msdyn_SalesAgents_LogMicroagentFlowDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_LogMicroagentFlowDataResponse>
{
  constructor(
    public msdyn_salesagentrunid: string,
    public msdyn_agenttype: number,
    public msdyn_salesagenttype: number | undefined,
    public trackingId: string | undefined,
    public continueOnError: boolean | undefined,
    public data: string
  ) {
    super("msdyn_SalesAgents_LogMicroagentFlowData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_LogMicroagentFlowData`;

    const body: Record<string, unknown> = {
      msdyn_salesagentrunid: this.msdyn_salesagentrunid,
      msdyn_agenttype: this.msdyn_agenttype,
      msdyn_salesagenttype: this.msdyn_salesagenttype,
      trackingId: this.trackingId,
      continueOnError: this.continueOnError,
      data: this.data,
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
  ): Promise<msdyn_SalesAgents_LogMicroagentFlowDataResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_LogMicroagentFlowDataResponse.fromResponse(data);
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
