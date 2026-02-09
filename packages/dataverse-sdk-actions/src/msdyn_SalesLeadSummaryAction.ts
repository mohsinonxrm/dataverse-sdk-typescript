import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesLeadSummary action
 */
export interface msdyn_SalesLeadSummaryResponse {
  msdyn_sales_copilot_output: string;
  msdyn_version: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_additionalDetails: string;
  msdyn_canUseCache: boolean;
}

/**
 * msdyn_SalesLeadSummary action
 *
 * Unbound action
 */
export class msdyn_SalesLeadSummaryAction implements Executable<msdyn_SalesLeadSummaryResponse> {
  constructor(
    public readonly msdyn_additionalParams: string,
    public readonly msdyn_activityId: string,
    public readonly msdyn_doSuggestUpdates: boolean,
    public readonly msdyn_parentContactId: string,
    public readonly msdyn_id: string,
    public readonly msdyn_lastComputationTime: string,
    public readonly msdyn_isMergedCatchupAndSummary: boolean,
    public readonly msdyn_skipHeader: string,
    public readonly msdyn_sessionId: string,
    public readonly msdyn_parentAccountId: string,
    public readonly msdyn_responseFormat: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesLeadSummary`;

    const body: Record<string, unknown> = {
      msdyn_additionalParams: this.msdyn_additionalParams,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_doSuggestUpdates: this.msdyn_doSuggestUpdates,
      msdyn_parentContactId: this.msdyn_parentContactId,
      msdyn_id: this.msdyn_id,
      msdyn_lastComputationTime: this.msdyn_lastComputationTime,
      msdyn_isMergedCatchupAndSummary: this.msdyn_isMergedCatchupAndSummary,
      msdyn_skipHeader: this.msdyn_skipHeader,
      msdyn_sessionId: this.msdyn_sessionId,
      msdyn_parentAccountId: this.msdyn_parentAccountId,
      msdyn_responseFormat: this.msdyn_responseFormat,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesLeadSummaryResponse> {
    const data = await response.json();
    return data as msdyn_SalesLeadSummaryResponse;
  }
}
