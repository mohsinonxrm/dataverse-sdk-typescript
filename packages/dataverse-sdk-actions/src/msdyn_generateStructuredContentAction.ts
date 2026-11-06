import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_generateStructuredContent action
 */
export interface msdyn_generateStructuredContentResponse {
  restructuredContent: string;
  status: string;
}

/**
 * Parameters of the msdyn_generateStructuredContent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_generateStructuredContentActionParameters {
  knobsConfigurations?: string;
  requestId: string;
  sourceContent: string;
  caller: string;
  structuringPrompt: string;
  copilotOptions?: string;
}

/**
 * msdyn_generateStructuredContent action
 *
 * Unbound action
 */
export class msdyn_generateStructuredContentAction implements Executable<msdyn_generateStructuredContentResponse> {
  constructor(public readonly parameters: msdyn_generateStructuredContentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_generateStructuredContent`;

    const body = requestBody({
      knobsConfigurations: this.parameters.knobsConfigurations,
      requestId: this.parameters.requestId,
      sourceContent: this.parameters.sourceContent,
      caller: this.parameters.caller,
      structuringPrompt: this.parameters.structuringPrompt,
      copilotOptions: this.parameters.copilotOptions,
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

  async parseResponse(response: Response): Promise<msdyn_generateStructuredContentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_generateStructuredContentResponse;
    return (await response.json()) as msdyn_generateStructuredContentResponse;
  }
}
