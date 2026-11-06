import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetSalesCopilotEmailInsights action
 */
export interface msdyn_GetSalesCopilotEmailInsightsResponse {}

/**
 * Parameters of the msdyn_GetSalesCopilotEmailInsights action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesCopilotEmailInsightsActionParameters {
  msdyn_activityid?: string;
  msdyn_regardinglogicalname: string;
  msdyn_internetmessageid: string;
  msdyn_regardingid: string;
  msdyn_messageid: string;
}

/**
 * msdyn_GetSalesCopilotEmailInsights action
 *
 * Unbound action
 */
export class msdyn_GetSalesCopilotEmailInsightsAction implements Executable<msdyn_GetSalesCopilotEmailInsightsResponse> {
  constructor(public readonly parameters: msdyn_GetSalesCopilotEmailInsightsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesCopilotEmailInsights`;

    const body = requestBody({
      msdyn_activityid: this.parameters.msdyn_activityid,
      msdyn_regardinglogicalname: this.parameters.msdyn_regardinglogicalname,
      msdyn_internetmessageid: this.parameters.msdyn_internetmessageid,
      msdyn_regardingid: this.parameters.msdyn_regardingid,
      msdyn_messageid: this.parameters.msdyn_messageid,
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
    if (response.status === 204) return {} as msdyn_GetSalesCopilotEmailInsightsResponse;
    return (await response.json()) as msdyn_GetSalesCopilotEmailInsightsResponse;
  }
}
