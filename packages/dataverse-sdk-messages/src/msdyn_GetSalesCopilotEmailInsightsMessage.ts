import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetSalesCopilotEmailInsightsResponse as msdyn_GetSalesCopilotEmailInsightsResponseData } from "./types/index.js";

/**
 * msdyn_GetSalesCopilotEmailInsights request message
 *
 * Web API Action: msdyn_GetSalesCopilotEmailInsights
 */
export class msdyn_GetSalesCopilotEmailInsightsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesCopilotEmailInsightsResponse>
{
  constructor(
    public msdyn_activityid: string | undefined,
    public msdyn_regardinglogicalname: string,
    public msdyn_internetmessageid: string,
    public msdyn_regardingid: string,
    public msdyn_messageid: string
  ) {
    super("msdyn_GetSalesCopilotEmailInsights");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesCopilotEmailInsights`;

    const body: Record<string, unknown> = {
      msdyn_activityid: this.msdyn_activityid,
      msdyn_regardinglogicalname: this.msdyn_regardinglogicalname,
      msdyn_internetmessageid: this.msdyn_internetmessageid,
      msdyn_regardingid: this.msdyn_regardingid,
      msdyn_messageid: this.msdyn_messageid,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesCopilotEmailInsightsResponse> {
    const data = await response.json();
    return msdyn_GetSalesCopilotEmailInsightsResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetSalesCopilotEmailInsights response message
 */
export class msdyn_GetSalesCopilotEmailInsightsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesCopilotEmailInsightsResponseData) {
    super("msdyn_GetSalesCopilotEmailInsights");
  }

  static fromResponse(data: unknown): msdyn_GetSalesCopilotEmailInsightsResponse {
    return new msdyn_GetSalesCopilotEmailInsightsResponse(
      responseObject<msdyn_GetSalesCopilotEmailInsightsResponseData>(data)
    );
  }
}
