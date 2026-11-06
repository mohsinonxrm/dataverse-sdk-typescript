import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesOpportunitySummary action
 */
export interface msdyn_SalesOpportunitySummaryResponse {
  msdyn_additionalDetails: string;
  msdyn_canUseCache: boolean;
  msdyn_sales_copilot_output: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_version: string;
}

/**
 * Parameters of the msdyn_SalesOpportunitySummary action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesOpportunitySummaryActionParameters {
  msdyn_lastComputationTime?: string;
  msdyn_sessionId?: string;
  msdyn_additionalParams?: string;
  msdyn_isMergedCatchupAndSummary?: boolean;
  msdyn_id: string;
  msdyn_skipHeader?: string;
  msdyn_responseFormat?: string;
  msdyn_activityId?: string;
}

/**
 * msdyn_SalesOpportunitySummary action
 *
 * Unbound action
 */
export class msdyn_SalesOpportunitySummaryAction implements Executable<msdyn_SalesOpportunitySummaryResponse> {
  constructor(public readonly parameters: msdyn_SalesOpportunitySummaryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOpportunitySummary`;

    const body = requestBody({
      msdyn_lastComputationTime: this.parameters.msdyn_lastComputationTime,
      msdyn_sessionId: this.parameters.msdyn_sessionId,
      msdyn_additionalParams: this.parameters.msdyn_additionalParams,
      msdyn_isMergedCatchupAndSummary: this.parameters.msdyn_isMergedCatchupAndSummary,
      msdyn_id: this.parameters.msdyn_id,
      msdyn_skipHeader: this.parameters.msdyn_skipHeader,
      msdyn_responseFormat: this.parameters.msdyn_responseFormat,
      msdyn_activityId: this.parameters.msdyn_activityId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOpportunitySummaryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesOpportunitySummaryResponse;
    return (await response.json()) as msdyn_SalesOpportunitySummaryResponse;
  }
}
