import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrieveConversationPayload action
 */
export interface msdyn_RetrieveConversationPayloadResponse {
  ConversationPayload: string;
}

/**
 * Parameters of the msdyn_RetrieveConversationPayload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveConversationPayloadActionParameters {
  ConversationId: string;
}

/**
 * msdyn_RetrieveConversationPayload action
 *
 * Unbound action
 */
export class msdyn_RetrieveConversationPayloadAction implements Executable<msdyn_RetrieveConversationPayloadResponse> {
  constructor(public readonly parameters: msdyn_RetrieveConversationPayloadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveConversationPayload`;

    const body = requestBody({
      ConversationId: this.parameters.ConversationId,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveConversationPayloadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RetrieveConversationPayloadResponse;
    return (await response.json()) as msdyn_RetrieveConversationPayloadResponse;
  }
}
