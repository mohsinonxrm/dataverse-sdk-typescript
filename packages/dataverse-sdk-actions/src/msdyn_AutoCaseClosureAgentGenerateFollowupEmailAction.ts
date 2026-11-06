import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AutoCaseClosureAgentGenerateFollowupEmail action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse = void;

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

  parseResponse(
    _response: Response
  ): Promise<msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
