import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_NotifyAgent action
 */
export interface CCaaS_NotifyAgentResponse {
  BulkActionId: string;
}

/**
 * Parameters of the CCaaS_NotifyAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_NotifyAgentActionParameters {
  AgentIds: string[];
  Message: string;
  ApiVersion: string;
  Title: string;
}

/**
 * CCaaS_NotifyAgent action
 *
 * Unbound action
 */
export class CCaaS_NotifyAgentAction implements Executable<CCaaS_NotifyAgentResponse> {
  constructor(public readonly parameters: CCaaS_NotifyAgentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_NotifyAgent`;

    const body = requestBody({
      AgentIds: this.parameters.AgentIds,
      Message: this.parameters.Message,
      ApiVersion: this.parameters.ApiVersion,
      Title: this.parameters.Title,
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

  async parseResponse(response: Response): Promise<CCaaS_NotifyAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_NotifyAgentResponse;
    return (await response.json()) as CCaaS_NotifyAgentResponse;
  }
}
