import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GenerateKBSearchPrompt action
 */
export interface msdyn_GenerateKBSearchPromptResponse {
  KBSearchExternalSourcePromptResponse: string;
}

/**
 * Parameters of the msdyn_GenerateKBSearchPrompt action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GenerateKBSearchPromptActionParameters {
  KBSearchExternalSourcePromptRequest: string;
}

/**
 * msdyn_GenerateKBSearchPrompt action
 *
 * Unbound action
 */
export class msdyn_GenerateKBSearchPromptAction implements Executable<msdyn_GenerateKBSearchPromptResponse> {
  constructor(public readonly parameters: msdyn_GenerateKBSearchPromptActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GenerateKBSearchPrompt`;

    const body = requestBody({
      KBSearchExternalSourcePromptRequest: this.parameters.KBSearchExternalSourcePromptRequest,
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

  async parseResponse(response: Response): Promise<msdyn_GenerateKBSearchPromptResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GenerateKBSearchPromptResponse;
    return (await response.json()) as msdyn_GenerateKBSearchPromptResponse;
  }
}
