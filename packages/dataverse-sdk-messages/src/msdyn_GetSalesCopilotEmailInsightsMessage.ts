import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSalesCopilotEmailInsights message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesCopilotEmailInsightsRequestParameters {
  msdyn_activityid?: string;
  msdyn_messageid: string;
  msdyn_internetmessageid: string;
  msdyn_regardinglogicalname: string;
  msdyn_regardingid: string;
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
      msdyn_messageid: this.Parameters.msdyn_messageid,
      msdyn_internetmessageid: this.Parameters.msdyn_internetmessageid,
      msdyn_regardinglogicalname: this.Parameters.msdyn_regardinglogicalname,
      msdyn_regardingid: this.Parameters.msdyn_regardingid,
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
    // The body is the complex value, with its @odata.context
    return msdyn_GetSalesCopilotEmailInsightsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSalesCopilotEmailInsights action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesCopilotEmailInsightsResult {
  "@odata.context"?: string;
}

/**
 * msdyn_GetSalesCopilotEmailInsights response message
 *
 * `result` is the value the msdyn_GetSalesCopilotEmailInsights action returns (see {@link msdyn_GetSalesCopilotEmailInsightsResult}).
 */
export class msdyn_GetSalesCopilotEmailInsightsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesCopilotEmailInsightsResult) {
    super("msdyn_GetSalesCopilotEmailInsights");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSalesCopilotEmailInsightsResponse {
    return new msdyn_GetSalesCopilotEmailInsightsResponse(
      data as msdyn_GetSalesCopilotEmailInsightsResult
    );
  }
}
