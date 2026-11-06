import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesLeadSummary action
 */
export interface msdyn_SalesLeadSummaryResponse {
  msdyn_additionalDetails: string;
  msdyn_canUseCache: boolean;
  msdyn_sales_copilot_output: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_version: string;
}

/**
 * Parameters of the msdyn_SalesLeadSummary action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesLeadSummaryActionParameters {
  msdyn_id: string;
  msdyn_sessionId?: string;
  msdyn_skipHeader?: string;
  msdyn_lastComputationTime?: string;
  msdyn_responseFormat?: string;
  msdyn_activityId?: string;
  msdyn_isMergedCatchupAndSummary?: boolean;
  msdyn_additionalParams?: string;
  msdyn_doSuggestUpdates?: boolean;
  msdyn_parentContactId?: string;
  msdyn_parentAccountId?: string;
}

/**
 * msdyn_SalesLeadSummary action
 *
 * Unbound action
 */
export class msdyn_SalesLeadSummaryAction implements Executable<msdyn_SalesLeadSummaryResponse> {
  constructor(public readonly parameters: msdyn_SalesLeadSummaryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesLeadSummary`;

    const body = requestBody({
      msdyn_id: this.parameters.msdyn_id,
      msdyn_sessionId: this.parameters.msdyn_sessionId,
      msdyn_skipHeader: this.parameters.msdyn_skipHeader,
      msdyn_lastComputationTime: this.parameters.msdyn_lastComputationTime,
      msdyn_responseFormat: this.parameters.msdyn_responseFormat,
      msdyn_activityId: this.parameters.msdyn_activityId,
      msdyn_isMergedCatchupAndSummary: this.parameters.msdyn_isMergedCatchupAndSummary,
      msdyn_additionalParams: this.parameters.msdyn_additionalParams,
      msdyn_doSuggestUpdates: this.parameters.msdyn_doSuggestUpdates,
      msdyn_parentContactId: this.parameters.msdyn_parentContactId,
      msdyn_parentAccountId: this.parameters.msdyn_parentAccountId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesLeadSummaryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesLeadSummaryResponse;
    return (await response.json()) as msdyn_SalesLeadSummaryResponse;
  }
}
