import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AutoCaseClosureAgentGenerateFollowupEmail action
 */
export interface msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_AutoCaseClosureAgentGenerateFollowupEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutoCaseClosureAgentGenerateFollowupEmailActionParameters {
  Payload: string;
}

/**
 * msdyn_AutoCaseClosureAgentGenerateFollowupEmail action
 *
 * Unbound action
 */
export class msdyn_AutoCaseClosureAgentGenerateFollowupEmailAction implements Executable<msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse> {
  constructor(
    public readonly parameters: msdyn_AutoCaseClosureAgentGenerateFollowupEmailActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoCaseClosureAgentGenerateFollowupEmail`;

    const body = requestBody({
      Payload: this.parameters.Payload,
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
  ): Promise<msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse;
  }
}
