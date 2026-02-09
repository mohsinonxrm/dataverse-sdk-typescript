import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetCopilotAgentStatusForEnvironment request message
 *
 * Web API Action: msdyn_GetCopilotAgentStatusForEnvironment
 */
export class msdyn_GetCopilotAgentStatusForEnvironmentRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCopilotAgentStatusForEnvironmentResponse>
{
  constructor() {
    super("msdyn_GetCopilotAgentStatusForEnvironment");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCopilotAgentStatusForEnvironment`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetCopilotAgentStatusForEnvironmentResponse> {
    const data = await response.json();
    return msdyn_GetCopilotAgentStatusForEnvironmentResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetCopilotAgentStatusForEnvironment response message
 */
export class msdyn_GetCopilotAgentStatusForEnvironmentResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCopilotAgentStatusForEnvironmentResponse) {
    super("msdyn_GetCopilotAgentStatusForEnvironment");
  }

  static fromResponse(data: unknown): msdyn_GetCopilotAgentStatusForEnvironmentResponse {
    return new msdyn_GetCopilotAgentStatusForEnvironmentResponse((data as any).value);
  }
}
