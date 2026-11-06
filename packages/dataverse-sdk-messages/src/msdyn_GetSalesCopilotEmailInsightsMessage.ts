import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSalesCopilotEmailInsightsResponse as msdyn_GetSalesCopilotEmailInsightsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetSalesCopilotEmailInsights message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesCopilotEmailInsightsRequestParameters {
  msdyn_activityid?: string;
  msdyn_regardinglogicalname: string;
  msdyn_internetmessageid: string;
  msdyn_regardingid: string;
  msdyn_messageid: string;
}

/**
 * msdyn_GetSalesCopilotEmailInsights request message
 *
 * Web API Action: msdyn_GetSalesCopilotEmailInsights
 */
export class msdyn_GetSalesCopilotEmailInsightsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesCopilotEmailInsightsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSalesCopilotEmailInsightsRequestParameters>;

  constructor(parameters: msdyn_GetSalesCopilotEmailInsightsRequestParameters) {
    super("msdyn_GetSalesCopilotEmailInsights", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesCopilotEmailInsights`;

    const body = requestBody({
      msdyn_activityid: this.Parameters.msdyn_activityid,
      msdyn_regardinglogicalname: this.Parameters.msdyn_regardinglogicalname,
      msdyn_internetmessageid: this.Parameters.msdyn_internetmessageid,
      msdyn_regardingid: this.Parameters.msdyn_regardingid,
      msdyn_messageid: this.Parameters.msdyn_messageid,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesCopilotEmailInsightsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetSalesCopilotEmailInsightsResponse.fromResponse({});
    return msdyn_GetSalesCopilotEmailInsightsResponse.fromResponse(await response.json());
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
