import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ContinueTransformationAgent action
 */
export interface msdyn_ContinueTransformationAgentResponse {
  msdyn_action: string;
  msdyn_activities: string;
  msdyn_conversationid: string;
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_ContinueTransformationAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ContinueTransformationAgentActionParameters {
  msdyn_conversationid: string;
  msdyn_environmentid?: string;
}

/**
 * msdyn_ContinueTransformationAgent action
 *
 * Unbound action
 */
export class msdyn_ContinueTransformationAgentAction implements Executable<msdyn_ContinueTransformationAgentResponse> {
  constructor(public readonly parameters: msdyn_ContinueTransformationAgentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ContinueTransformationAgent`;

    const body = requestBody({
      msdyn_conversationid: this.parameters.msdyn_conversationid,
      msdyn_environmentid: this.parameters.msdyn_environmentid,
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

  async parseResponse(response: Response): Promise<msdyn_ContinueTransformationAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ContinueTransformationAgentResponse;
    return (await response.json()) as msdyn_ContinueTransformationAgentResponse;
  }
}
