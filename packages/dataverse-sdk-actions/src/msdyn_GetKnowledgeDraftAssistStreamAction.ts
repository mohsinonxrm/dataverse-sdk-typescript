import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetKnowledgeDraftAssistStream action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_GetKnowledgeDraftAssistStreamResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_GetKnowledgeDraftAssistStreamResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
