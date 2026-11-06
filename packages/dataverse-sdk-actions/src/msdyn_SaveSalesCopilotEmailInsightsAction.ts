import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SaveSalesCopilotEmailInsights action
 */
export interface msdyn_SaveSalesCopilotEmailInsightsResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SaveSalesCopilotEmailInsights action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveSalesCopilotEmailInsightsActionParameters {
  msdyn_extractedquestions?: Record<string, unknown>[];
  msdyn_activityid?: string;
  msdyn_salescopilotemailinsights: Record<string, unknown>[];
}

/**
 * msdyn_SaveSalesCopilotEmailInsights action
 *
 * Unbound action
 */
export class msdyn_SaveSalesCopilotEmailInsightsAction implements Executable<msdyn_SaveSalesCopilotEmailInsightsResponse> {
  constructor(public readonly parameters: msdyn_SaveSalesCopilotEmailInsightsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveSalesCopilotEmailInsights`;

    const body = requestBody({
      msdyn_extractedquestions: this.parameters.msdyn_extractedquestions,
      msdyn_activityid: this.parameters.msdyn_activityid,
      msdyn_salescopilotemailinsights: this.parameters.msdyn_salescopilotemailinsights,
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

  async parseResponse(response: Response): Promise<msdyn_SaveSalesCopilotEmailInsightsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SaveSalesCopilotEmailInsightsResponse;
    return (await response.json()) as msdyn_SaveSalesCopilotEmailInsightsResponse;
  }
}
