import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetEmailAssistStream action
 */
export interface msdyn_GetEmailAssistStreamResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_GetEmailAssistStream action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEmailAssistStreamActionParameters {
  Context?: string;
  RequestPayload: string;
}

/**
 * msdyn_GetEmailAssistStream action
 *
 * Unbound action
 */
export class msdyn_GetEmailAssistStreamAction implements Executable<msdyn_GetEmailAssistStreamResponse> {
  constructor(public readonly parameters: msdyn_GetEmailAssistStreamActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEmailAssistStream`;

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

  async parseResponse(response: Response): Promise<msdyn_GetEmailAssistStreamResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetEmailAssistStreamResponse;
    return (await response.json()) as msdyn_GetEmailAssistStreamResponse;
  }
}
