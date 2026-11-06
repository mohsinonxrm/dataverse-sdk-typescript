import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetKnowledgeDraftAssistStream action
 */
export interface msdyn_GetKnowledgeDraftAssistStreamResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_GetKnowledgeDraftAssistStream action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKnowledgeDraftAssistStreamActionParameters {
  Context?: string;
  RequestPayload: string;
}

/**
 * msdyn_GetKnowledgeDraftAssistStream action
 *
 * Unbound action
 */
export class msdyn_GetKnowledgeDraftAssistStreamAction implements Executable<msdyn_GetKnowledgeDraftAssistStreamResponse> {
  constructor(public readonly parameters: msdyn_GetKnowledgeDraftAssistStreamActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKnowledgeDraftAssistStream`;

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

  async parseResponse(response: Response): Promise<msdyn_GetKnowledgeDraftAssistStreamResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetKnowledgeDraftAssistStreamResponse;
    return (await response.json()) as msdyn_GetKnowledgeDraftAssistStreamResponse;
  }
}
