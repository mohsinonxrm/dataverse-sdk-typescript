import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_ProvisionCallbackAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_ProvisionCallbackAgentResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_ProvisionCallbackAgentResponse;
  }
}
