import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetInsights action
 */
export interface msdyn_GetInsightsResponse {
  msdyn_insight: string;
  msdyn_status: number;
}

/**
 * Parameters of the msdyn_GetInsights action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetInsightsActionParameters {
  msdyn_payload: string;
  msdyn_insighttype: string;
  msdyn_responseFormat?: string;
}

/**
 * msdyn_GetInsights action
 *
 * Unbound action
 */
export class msdyn_GetInsightsAction implements Executable<msdyn_GetInsightsResponse> {
  constructor(public readonly parameters: msdyn_GetInsightsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetInsights`;

    const body = requestBody({
      msdyn_payload: this.parameters.msdyn_payload,
      msdyn_insighttype: this.parameters.msdyn_insighttype,
      msdyn_responseFormat: this.parameters.msdyn_responseFormat,
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

  async parseResponse(response: Response): Promise<msdyn_GetInsightsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetInsightsResponse;
  }
}
