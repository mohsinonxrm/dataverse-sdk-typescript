import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AutoCaseClosureAgentGenerateFollowupEmail request message
 *
 * Web API Action: msdyn_AutoCaseClosureAgentGenerateFollowupEmail
 */
export class msdyn_AutoCaseClosureAgentGenerateFollowupEmailRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse>
{
  constructor(public payload: string) {
    super("msdyn_AutoCaseClosureAgentGenerateFollowupEmail");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoCaseClosureAgentGenerateFollowupEmail`;

    const body: Record<string, unknown> = {
      Payload: this.payload,
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
  ): Promise<msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse> {
    // No return value (204 No Content)
    return new msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Payload: this.payload,
    };
  }
}

/**
 * msdyn_AutoCaseClosureAgentGenerateFollowupEmail response message
 */
export class msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AutoCaseClosureAgentGenerateFollowupEmail");
  }

  static fromResponse(_data: unknown): msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse {
    return new msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse();
  }
}
