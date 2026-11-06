import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AutonomousSQA_UpdateSalesAgentRun request message
 *
 * Web API Action: msdyn_AutonomousSQA_UpdateSalesAgentRun
 */
export class msdyn_AutonomousSQA_UpdateSalesAgentRunRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_UpdateSalesAgentRunResponse>
{
  constructor(
    public msdyn_IsNonRetryableError: boolean,
    public msdyn_IsSalesAgentRunComplete: boolean,
    public msdyn_SalesAgentRun: string,
    public msdyn_TrackingId: string,
    public msdyn_HasAgentRunFailed: boolean,
    public msdyn_IsAgentThrottled: boolean,
    public msdyn_RetryAfterDate: string,
    public msdyn_HasAgentRunStarted: boolean,
    public msdyn_SalesMacroAgentType: number
  ) {
    super("msdyn_AutonomousSQA_UpdateSalesAgentRun");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_AutonomousSQA_UpdateSalesAgentRunResponse> {
    // No return value (204 No Content)
    return new msdyn_AutonomousSQA_UpdateSalesAgentRunResponse();
  }
}

/**
 * msdyn_AutonomousSQA_UpdateSalesAgentRun response message
 */
export class msdyn_AutonomousSQA_UpdateSalesAgentRunResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AutonomousSQA_UpdateSalesAgentRun");
  }

  static fromResponse(_data: unknown): msdyn_AutonomousSQA_UpdateSalesAgentRunResponse {
    return new msdyn_AutonomousSQA_UpdateSalesAgentRunResponse();
  }
}
