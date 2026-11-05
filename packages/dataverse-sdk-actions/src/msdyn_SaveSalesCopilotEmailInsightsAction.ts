import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SaveSalesCopilotEmailInsights action
 */
export interface msdyn_SaveSalesCopilotEmailInsightsResponse {
  // No content returned
}

/**
 * msdyn_SaveSalesCopilotEmailInsights action
 *
 * Unbound action
 */
export class msdyn_SaveSalesCopilotEmailInsightsAction implements Executable<msdyn_SaveSalesCopilotEmailInsightsResponse> {
  constructor(
    public readonly msdyn_extractedquestions: Record<string, unknown>[],
    public readonly msdyn_activityid: string,
    public readonly msdyn_salescopilotemailinsights: Record<string, unknown>[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveSalesCopilotEmailInsights`;

    const body: Record<string, unknown> = {
      msdyn_extractedquestions: this.msdyn_extractedquestions,
      msdyn_activityid: this.msdyn_activityid,
      msdyn_salescopilotemailinsights: this.msdyn_salescopilotemailinsights,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SaveSalesCopilotEmailInsightsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
