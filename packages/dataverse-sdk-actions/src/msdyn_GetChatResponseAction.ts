import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetChatResponse action
 */
export interface msdyn_GetChatResponseResponse {
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_GetChatResponse action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetChatResponseActionParameters {
  msdyn_input: string;
}

/**
 * msdyn_GetChatResponse action
 *
 * Unbound action
 */
export class msdyn_GetChatResponseAction implements Executable<msdyn_GetChatResponseResponse> {
  constructor(public readonly parameters: msdyn_GetChatResponseActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetChatResponse`;

    const body = requestBody({
      msdyn_input: this.parameters.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetChatResponseResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetChatResponseResponse;
    return (await response.json()) as msdyn_GetChatResponseResponse;
  }
}
