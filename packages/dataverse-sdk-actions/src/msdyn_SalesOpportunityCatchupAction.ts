import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesOpportunityCatchup action
 */
export interface msdyn_SalesOpportunityCatchupResponse {
  msdyn_version: string;
  msdyn_summary: string;
  msdyn_sales_copilot_output: string;
  msdyn_summary_raw: string;
}

/**
 * Parameters of the msdyn_SalesOpportunityCatchup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesOpportunityCatchupActionParameters {
  msdyn_since?: string;
  msdyn_responseFormat?: string;
  msdyn_additionalParams?: string;
  msdyn_sessionId?: string;
  msdyn_activityId?: string;
  msdyn_skipHeader?: string;
  msdyn_id: string;
}

/**
 * msdyn_SalesOpportunityCatchup action
 *
 * Unbound action
 */
export class msdyn_SalesOpportunityCatchupAction implements Executable<msdyn_SalesOpportunityCatchupResponse> {
  constructor(public readonly parameters: msdyn_SalesOpportunityCatchupActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOpportunityCatchup`;

    const body = requestBody({
      msdyn_since: this.parameters.msdyn_since,
      msdyn_responseFormat: this.parameters.msdyn_responseFormat,
      msdyn_additionalParams: this.parameters.msdyn_additionalParams,
      msdyn_sessionId: this.parameters.msdyn_sessionId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOpportunityCatchupResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesOpportunityCatchupResponse;
    return (await response.json()) as msdyn_SalesOpportunityCatchupResponse;
  }
}
