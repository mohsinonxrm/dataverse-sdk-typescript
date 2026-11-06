import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAgentAssistStream action
 */
export interface msdyn_GetAgentAssistStreamResponse {
  Result: string[];
}

/**
 * Parameters of the msdyn_GetAgentAssistStream action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAgentAssistStreamActionParameters {
  Context?: string;
  RequestPayload: string;
}

/**
 * msdyn_GetAgentAssistStream action
 *
 * Unbound action
 */
export class msdyn_GetAgentAssistStreamAction implements Executable<msdyn_GetAgentAssistStreamResponse> {
  constructor(public readonly parameters: msdyn_GetAgentAssistStreamActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAgentAssistStream`;

    const body = requestBody({
      Context: this.parameters.Context,
      RequestPayload: this.parameters.RequestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_GetAgentAssistStreamResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetAgentAssistStreamResponse;
    return (await response.json()) as msdyn_GetAgentAssistStreamResponse;
  }
}
