import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_ModifyAgentPresence action
 */
export interface CCaaS_ModifyAgentPresenceResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_ModifyAgentPresence action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ModifyAgentPresenceActionParameters {
  PresenceId: string;
  AgentId: string;
  ApiVersion: string;
}

/**
 * CCaaS_ModifyAgentPresence action
 *
 * Unbound action
 */
export class CCaaS_ModifyAgentPresenceAction implements Executable<CCaaS_ModifyAgentPresenceResponse> {
  constructor(public readonly parameters: CCaaS_ModifyAgentPresenceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_ModifyAgentPresence`;

    const body = requestBody({
      PresenceId: this.parameters.PresenceId,
      AgentId: this.parameters.AgentId,
      ApiVersion: this.parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_ModifyAgentPresenceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_ModifyAgentPresenceResponse;
    return (await response.json()) as CCaaS_ModifyAgentPresenceResponse;
  }
}
