import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AutonomousSQA_UpdateSalesAgentRun action
 */
export interface msdyn_AutonomousSQA_UpdateSalesAgentRunResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_AutonomousSQA_UpdateSalesAgentRun action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_UpdateSalesAgentRunActionParameters {
  msdyn_IsNonRetryableError?: boolean;
  msdyn_IsSalesAgentRunComplete?: boolean;
  msdyn_SalesAgentRun?: string;
  msdyn_TrackingId?: string;
  msdyn_HasAgentRunFailed?: boolean;
  msdyn_IsAgentThrottled?: boolean;
  msdyn_RetryAfterDate?: string;
  msdyn_HasAgentRunStarted?: boolean;
  msdyn_SalesMacroAgentType?: number;
}

/**
 * msdyn_AutonomousSQA_UpdateSalesAgentRun action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_UpdateSalesAgentRunAction implements Executable<msdyn_AutonomousSQA_UpdateSalesAgentRunResponse> {
  constructor(
    public readonly parameters: msdyn_AutonomousSQA_UpdateSalesAgentRunActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_UpdateSalesAgentRun`;

    const body = requestBody({
      msdyn_IsNonRetryableError: this.parameters.msdyn_IsNonRetryableError,
      msdyn_IsSalesAgentRunComplete: this.parameters.msdyn_IsSalesAgentRunComplete,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_HasAgentRunFailed: this.parameters.msdyn_HasAgentRunFailed,
      msdyn_IsAgentThrottled: this.parameters.msdyn_IsAgentThrottled,
      msdyn_RetryAfterDate: this.parameters.msdyn_RetryAfterDate,
      msdyn_HasAgentRunStarted: this.parameters.msdyn_HasAgentRunStarted,
      msdyn_SalesMacroAgentType: this.parameters.msdyn_SalesMacroAgentType,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_AutonomousSQA_UpdateSalesAgentRunResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_AutonomousSQA_UpdateSalesAgentRunResponse;
    return (await response.json()) as msdyn_AutonomousSQA_UpdateSalesAgentRunResponse;
  }
}
