import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ValidateConversationPayload action
 */
export interface msdyn_ValidateConversationPayloadResponse {
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_ValidateConversationPayload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ValidateConversationPayloadActionParameters {
  ConversationId: string;
}

/**
 * msdyn_ValidateConversationPayload action
 *
 * Unbound action
 */
export class msdyn_ValidateConversationPayloadAction implements Executable<msdyn_ValidateConversationPayloadResponse> {
  constructor(public readonly parameters: msdyn_ValidateConversationPayloadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateConversationPayload`;

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

  async parseResponse(response: Response): Promise<msdyn_ValidateConversationPayloadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ValidateConversationPayloadResponse;
    return (await response.json()) as msdyn_ValidateConversationPayloadResponse;
  }
}
