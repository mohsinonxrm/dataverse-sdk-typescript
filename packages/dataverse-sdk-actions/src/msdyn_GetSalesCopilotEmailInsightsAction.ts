import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetSalesCopilotEmailInsights action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesCopilotEmailInsightsResponse {
  "@odata.context"?: string;
}

/**
 * Parameters of the msdyn_GetSalesCopilotEmailInsights action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesCopilotEmailInsightsActionParameters {
  msdyn_activityid?: string;
  msdyn_messageid: string;
  msdyn_internetmessageid: string;
  msdyn_regardinglogicalname: string;
  msdyn_regardingid: string;
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
      msdyn_messageid: this.parameters.msdyn_messageid,
      msdyn_internetmessageid: this.parameters.msdyn_internetmessageid,
      msdyn_regardinglogicalname: this.parameters.msdyn_regardinglogicalname,
      msdyn_regardingid: this.parameters.msdyn_regardingid,
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
    return (await response.json()) as msdyn_GetSalesCopilotEmailInsightsResponse;
  }
}
