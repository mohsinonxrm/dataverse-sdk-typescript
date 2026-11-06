import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetCopilotAgentStatusForEnvironment action
 */
export interface msdyn_GetCopilotAgentStatusForEnvironmentResponse {
  ErrorMessage: string;
  IsSuccess: boolean;
  msdyn_isAgentCapacityEnabled: boolean;
  msdyn_isAgentEnabled: boolean;
  msdyn_isBingChatEnabled: boolean;
  msdyn_isCopilotCrossGeoRequestEnabled: boolean;
  msdyn_isM365TenantEnabled: boolean;
}

/**
 * Parameters of the msdyn_GetCopilotAgentStatusForEnvironment action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCopilotAgentStatusForEnvironmentActionParameters {
  msdyn_salesAgentType?: number;
}

/**
 * msdyn_GetCopilotAgentStatusForEnvironment action
 *
 * Unbound action
 */
export class msdyn_GetCopilotAgentStatusForEnvironmentAction implements Executable<msdyn_GetCopilotAgentStatusForEnvironmentResponse> {
  constructor(
    public readonly parameters: msdyn_GetCopilotAgentStatusForEnvironmentActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCopilotAgentStatusForEnvironment`;

    const body = requestBody({
      msdyn_salesAgentType: this.parameters.msdyn_salesAgentType,
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
  ): Promise<msdyn_GetCopilotAgentStatusForEnvironmentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetCopilotAgentStatusForEnvironmentResponse;
    return (await response.json()) as msdyn_GetCopilotAgentStatusForEnvironmentResponse;
  }
}
