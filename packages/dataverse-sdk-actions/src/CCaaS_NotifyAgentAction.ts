import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_NotifyAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_NotifyAgentResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_NotifyAgentResponse;
  }
}
