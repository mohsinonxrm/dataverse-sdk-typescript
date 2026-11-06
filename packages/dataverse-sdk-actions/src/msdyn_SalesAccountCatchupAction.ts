import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAccountCatchup action
 */
export interface msdyn_SalesAccountCatchupResponse {
  msdyn_sales_copilot_output: string;
  msdyn_version: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
}

/**
 * Parameters of the msdyn_SalesAccountCatchup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAccountCatchupActionParameters {
  msdyn_id: string;
  msdyn_sessionId?: string;
  msdyn_responseFormat?: string;
  msdyn_activityId?: string;
  msdyn_since?: string;
  msdyn_skipHeader?: string;
  msdyn_additionalParams?: string;
}

/**
 * msdyn_SalesAccountCatchup action
 *
 * Unbound action
 */
export class msdyn_SalesAccountCatchupAction implements Executable<msdyn_SalesAccountCatchupResponse> {
  constructor(public readonly parameters: msdyn_SalesAccountCatchupActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAccountCatchup`;

    const body = requestBody({
      msdyn_id: this.parameters.msdyn_id,
      msdyn_sessionId: this.parameters.msdyn_sessionId,
      msdyn_responseFormat: this.parameters.msdyn_responseFormat,
      msdyn_activityId: this.parameters.msdyn_activityId,
      msdyn_since: this.parameters.msdyn_since,
      msdyn_skipHeader: this.parameters.msdyn_skipHeader,
      msdyn_additionalParams: this.parameters.msdyn_additionalParams,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAccountCatchupResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesAccountCatchupResponse;
  }
}
