import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAccountSummary action
 */
export interface msdyn_SalesAccountSummaryResponse {
  msdyn_additionalDetails: string;
  msdyn_sales_copilot_output: string;
  msdyn_canUseCache: boolean;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_version: string;
}

/**
 * msdyn_SalesAccountSummary action
 *
 * Unbound action
 */
export class msdyn_SalesAccountSummaryAction implements Executable<msdyn_SalesAccountSummaryResponse> {
  constructor(
    public readonly msdyn_sessionId: string,
    public readonly msdyn_lastComputationTime: string,
    public readonly msdyn_activityId: string,
    public readonly msdyn_isMergedCatchupAndSummary: boolean,
    public readonly msdyn_additionalParams: string,
    public readonly msdyn_responseFormat: string,
    public readonly msdyn_id: string,
    public readonly msdyn_skipHeader: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAccountSummary`;

    const body: Record<string, unknown> = {
      msdyn_sessionId: this.msdyn_sessionId,
      msdyn_lastComputationTime: this.msdyn_lastComputationTime,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_isMergedCatchupAndSummary: this.msdyn_isMergedCatchupAndSummary,
      msdyn_additionalParams: this.msdyn_additionalParams,
      msdyn_responseFormat: this.msdyn_responseFormat,
      msdyn_id: this.msdyn_id,
      msdyn_skipHeader: this.msdyn_skipHeader,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAccountSummaryResponse> {
    const data = await response.json();
    return data as msdyn_SalesAccountSummaryResponse;
  }
}
