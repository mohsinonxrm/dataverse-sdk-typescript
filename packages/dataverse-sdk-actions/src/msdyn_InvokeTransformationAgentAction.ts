import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InvokeTransformationAgent action
 */
export interface msdyn_InvokeTransformationAgentResponse {
  msdyn_action: string;
  msdyn_activities: string;
  msdyn_conversationid: string;
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_InvokeTransformationAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeTransformationAgentActionParameters {
  msdyn_message?: string;
  msdyn_environmentid?: string;
  msdyn_conversationid?: string;
  msdyn_context?: string;
}

/**
 * msdyn_InvokeTransformationAgent action
 *
 * Unbound action
 */
export class msdyn_InvokeTransformationAgentAction implements Executable<msdyn_InvokeTransformationAgentResponse> {
  constructor(public readonly parameters: msdyn_InvokeTransformationAgentActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeTransformationAgent`;

    const body = requestBody({
      msdyn_message: this.parameters.msdyn_message,
      msdyn_environmentid: this.parameters.msdyn_environmentid,
      msdyn_conversationid: this.parameters.msdyn_conversationid,
      msdyn_context: this.parameters.msdyn_context,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeTransformationAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_InvokeTransformationAgentResponse;
    return (await response.json()) as msdyn_InvokeTransformationAgentResponse;
  }
}
