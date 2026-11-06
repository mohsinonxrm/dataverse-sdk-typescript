import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetMessageForCaseFollowupAndClosureAgent action
 */
export interface msdyn_GetMessageForCaseFollowupAndClosureAgentResponse {
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_GetMessageForCaseFollowupAndClosureAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMessageForCaseFollowupAndClosureAgentActionParameters {
  msdyn_payload: string;
}

/**
 * msdyn_GetMessageForCaseFollowupAndClosureAgent action
 *
 * Unbound action
 */
export class msdyn_GetMessageForCaseFollowupAndClosureAgentAction implements Executable<msdyn_GetMessageForCaseFollowupAndClosureAgentResponse> {
  constructor(
    public readonly parameters: msdyn_GetMessageForCaseFollowupAndClosureAgentActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMessageForCaseFollowupAndClosureAgent`;

    const body = requestBody({
      msdyn_payload: this.parameters.msdyn_payload,
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
  ): Promise<msdyn_GetMessageForCaseFollowupAndClosureAgentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetMessageForCaseFollowupAndClosureAgentResponse;
  }
}
