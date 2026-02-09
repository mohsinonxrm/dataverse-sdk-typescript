import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AutonomousSQA_UpdateSalesAgentRun action
 */
export interface msdyn_AutonomousSQA_UpdateSalesAgentRunResponse {
  // No content returned
}

/**
 * msdyn_AutonomousSQA_UpdateSalesAgentRun action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_UpdateSalesAgentRunAction implements Executable<msdyn_AutonomousSQA_UpdateSalesAgentRunResponse> {
  constructor(
    public readonly msdyn_IsNonRetryableError: boolean,
    public readonly msdyn_IsSalesAgentRunComplete: boolean,
    public readonly msdyn_SalesAgentRun: string,
    public readonly msdyn_TrackingId: string,
    public readonly msdyn_HasAgentRunFailed: boolean,
    public readonly msdyn_IsAgentThrottled: boolean,
    public readonly msdyn_RetryAfterDate: string,
    public readonly msdyn_HasAgentRunStarted: boolean,
    public readonly msdyn_SalesMacroAgentType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_UpdateSalesAgentRun`;

    const body: Record<string, unknown> = {
      msdyn_IsNonRetryableError: this.msdyn_IsNonRetryableError,
      msdyn_IsSalesAgentRunComplete: this.msdyn_IsSalesAgentRunComplete,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_HasAgentRunFailed: this.msdyn_HasAgentRunFailed,
      msdyn_IsAgentThrottled: this.msdyn_IsAgentThrottled,
      msdyn_RetryAfterDate: this.msdyn_RetryAfterDate,
      msdyn_HasAgentRunStarted: this.msdyn_HasAgentRunStarted,
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_AutonomousSQA_UpdateSalesAgentRunResponse> {
    // No return value (204 No Content)
    return {};
  }
}
