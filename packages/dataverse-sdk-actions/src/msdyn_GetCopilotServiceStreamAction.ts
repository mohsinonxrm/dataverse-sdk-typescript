import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetCopilotServiceStream action
 */
export interface msdyn_GetCopilotServiceStreamResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_GetCopilotServiceStream action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCopilotServiceStreamActionParameters {
  Context: string;
  RequestPayload?: string;
}

/**
 * msdyn_GetCopilotServiceStream action
 *
 * Unbound action
 */
export class msdyn_GetCopilotServiceStreamAction implements Executable<msdyn_GetCopilotServiceStreamResponse> {
  constructor(public readonly parameters: msdyn_GetCopilotServiceStreamActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCopilotServiceStream`;

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

  async parseResponse(response: Response): Promise<msdyn_GetCopilotServiceStreamResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetCopilotServiceStreamResponse;
    return (await response.json()) as msdyn_GetCopilotServiceStreamResponse;
  }
}
