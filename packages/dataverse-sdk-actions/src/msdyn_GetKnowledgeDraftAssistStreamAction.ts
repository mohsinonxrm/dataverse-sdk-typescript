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
  RequestPayload: string;
  Context?: string;
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
      RequestPayload: this.parameters.RequestPayload,
      Context: this.parameters.Context,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetKnowledgeDraftAssistStreamResponse;
  }
}
