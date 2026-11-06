import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_ProvisionCallbackAgent action
 */
export interface CCaaS_ProvisionCallbackAgentResponse {
  BotId: string;
}

/**
 * Parameters of the CCaaS_ProvisionCallbackAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ProvisionCallbackAgentActionParameters {
  ApiVersion: string;
}

/**
 * CCaaS_ProvisionCallbackAgent action
 *
 * Unbound action
 */
export class CCaaS_ProvisionCallbackAgentAction implements Executable<CCaaS_ProvisionCallbackAgentResponse> {
  constructor(public readonly parameters: CCaaS_ProvisionCallbackAgentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_ProvisionCallbackAgent`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<CCaaS_ProvisionCallbackAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_ProvisionCallbackAgentResponse;
    return (await response.json()) as CCaaS_ProvisionCallbackAgentResponse;
  }
}
