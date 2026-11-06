import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetCopilotAgentStatusForEnvironment action
 */
export interface msdyn_GetCopilotAgentStatusForEnvironmentResponse {
  msdyn_isCopilotCrossGeoRequestEnabled: boolean;
  msdyn_isBingChatEnabled: boolean;
  IsSuccess: boolean;
  ErrorMessage: string;
  msdyn_isAgentEnabled: boolean;
  msdyn_isM365TenantEnabled: boolean;
  msdyn_isAgentCapacityEnabled: boolean;
}

/**
 * msdyn_GetCopilotAgentStatusForEnvironment action
 *
 * Unbound action
 */
export class msdyn_GetCopilotAgentStatusForEnvironmentAction implements Executable<msdyn_GetCopilotAgentStatusForEnvironmentResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCopilotAgentStatusForEnvironment`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetCopilotAgentStatusForEnvironmentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetCopilotAgentStatusForEnvironmentResponse;
  }
}
