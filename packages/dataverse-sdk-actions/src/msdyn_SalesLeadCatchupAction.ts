import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesLeadCatchup action
 */
export interface msdyn_SalesLeadCatchupResponse {
  msdyn_summary_raw: string;
  msdyn_summary: string;
  msdyn_version: string;
  msdyn_sales_copilot_output: string;
}

/**
 * Parameters of the msdyn_SalesLeadCatchup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesLeadCatchupActionParameters {
  msdyn_since?: string;
  msdyn_sessionId?: string;
  msdyn_responseFormat?: string;
  msdyn_additionalParams?: string;
  msdyn_activityId?: string;
  msdyn_skipHeader?: string;
  msdyn_id: string;
}

/**
 * msdyn_SalesLeadCatchup action
 *
 * Unbound action
 */
export class msdyn_SalesLeadCatchupAction implements Executable<msdyn_SalesLeadCatchupResponse> {
  constructor(public readonly parameters: msdyn_SalesLeadCatchupActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesLeadCatchup`;

    const body = requestBody({
      msdyn_since: this.parameters.msdyn_since,
      msdyn_sessionId: this.parameters.msdyn_sessionId,
      msdyn_responseFormat: this.parameters.msdyn_responseFormat,
      msdyn_additionalParams: this.parameters.msdyn_additionalParams,
      msdyn_activityId: this.parameters.msdyn_activityId,
      msdyn_skipHeader: this.parameters.msdyn_skipHeader,
      msdyn_id: this.parameters.msdyn_id,
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

  async parseResponse(response: Response): Promise<msdyn_SalesLeadCatchupResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesLeadCatchupResponse;
  }
}
