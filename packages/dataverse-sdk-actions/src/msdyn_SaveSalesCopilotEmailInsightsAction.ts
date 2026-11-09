import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SaveSalesCopilotEmailInsights action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SaveSalesCopilotEmailInsightsResponse = void;

/**
 * Parameters of the msdyn_SaveSalesCopilotEmailInsights action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveSalesCopilotEmailInsightsActionParameters {
  msdyn_activityid?: string;
  msdyn_extractedquestions?: Record<string, unknown>[];
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
      msdyn_activityid: this.parameters.msdyn_activityid,
      msdyn_extractedquestions: this.parameters.msdyn_extractedquestions,
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

  parseResponse(_response: Response): Promise<msdyn_SaveSalesCopilotEmailInsightsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
