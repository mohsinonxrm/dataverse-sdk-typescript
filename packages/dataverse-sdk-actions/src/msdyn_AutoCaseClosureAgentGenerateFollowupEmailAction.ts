import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AutoCaseClosureAgentGenerateFollowupEmail action
 */
export interface msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse {
  // No content returned
}

/**
 * msdyn_AutoCaseClosureAgentGenerateFollowupEmail action
 *
 * Unbound action
 */
export class msdyn_AutoCaseClosureAgentGenerateFollowupEmailAction implements Executable<msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse> {
  constructor(public readonly payload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoCaseClosureAgentGenerateFollowupEmail`;

    const body: Record<string, unknown> = {
      Payload: this.payload,
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
  ): Promise<msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse> {
    // No return value (204 No Content)
    return {};
  }
}
