import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesOpportunitySummary action
 */
export interface msdyn_SalesOpportunitySummaryResponse {
  msdyn_additionalDetails: string;
  msdyn_summary: string;
  msdyn_version: string;
  msdyn_sales_copilot_output: string;
  msdyn_summary_raw: string;
  msdyn_canUseCache: boolean;
}

/**
 * msdyn_SalesOpportunitySummary action
 *
 * Unbound action
 */
export class msdyn_SalesOpportunitySummaryAction implements Executable<msdyn_SalesOpportunitySummaryResponse> {
  constructor(
    public readonly msdyn_skipHeader: string,
    public readonly msdyn_lastComputationTime: string,
    public readonly msdyn_id: string,
    public readonly msdyn_isMergedCatchupAndSummary: boolean,
    public readonly msdyn_additionalParams: string,
    public readonly msdyn_sessionId: string,
    public readonly msdyn_activityId: string,
    public readonly msdyn_responseFormat: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOpportunitySummary`;

    const body: Record<string, unknown> = {
      msdyn_skipHeader: this.msdyn_skipHeader,
      msdyn_lastComputationTime: this.msdyn_lastComputationTime,
      msdyn_id: this.msdyn_id,
      msdyn_isMergedCatchupAndSummary: this.msdyn_isMergedCatchupAndSummary,
      msdyn_additionalParams: this.msdyn_additionalParams,
      msdyn_sessionId: this.msdyn_sessionId,
      msdyn_activityId: this.msdyn_activityId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOpportunitySummaryResponse> {
    const data = await response.json();
    return data as msdyn_SalesOpportunitySummaryResponse;
  }
}
