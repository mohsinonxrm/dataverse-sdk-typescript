import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AutonomousSQA_UpdateSalesAgentRun message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_UpdateSalesAgentRunRequestParameters {
  msdyn_IsSalesAgentRunComplete?: boolean;
  msdyn_HasAgentRunStarted?: boolean;
  msdyn_RetryAfterDate?: string;
  msdyn_SalesAgentRun?: string;
  msdyn_HasAgentRunFailed?: boolean;
  msdyn_TrackingId?: string;
  msdyn_IsAgentThrottled?: boolean;
  msdyn_IsNonRetryableError?: boolean;
  msdyn_SalesMacroAgentType?: number;
}

/**
 * msdyn_AutonomousSQA_UpdateSalesAgentRun request message
 *
 * Web API Action: msdyn_AutonomousSQA_UpdateSalesAgentRun
 */
export class msdyn_AutonomousSQA_UpdateSalesAgentRunRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_UpdateSalesAgentRunResponse>
{
  declare readonly Parameters: Readonly<msdyn_AutonomousSQA_UpdateSalesAgentRunRequestParameters>;

  constructor(parameters: msdyn_AutonomousSQA_UpdateSalesAgentRunRequestParameters = {}) {
    super("msdyn_AutonomousSQA_UpdateSalesAgentRun", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_UpdateSalesAgentRun`;

    const body = requestBody({
      msdyn_IsSalesAgentRunComplete: this.Parameters.msdyn_IsSalesAgentRunComplete,
      msdyn_HasAgentRunStarted: this.Parameters.msdyn_HasAgentRunStarted,
      msdyn_RetryAfterDate: this.Parameters.msdyn_RetryAfterDate,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_HasAgentRunFailed: this.Parameters.msdyn_HasAgentRunFailed,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_IsAgentThrottled: this.Parameters.msdyn_IsAgentThrottled,
      msdyn_IsNonRetryableError: this.Parameters.msdyn_IsNonRetryableError,
      msdyn_SalesMacroAgentType: this.Parameters.msdyn_SalesMacroAgentType,
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
