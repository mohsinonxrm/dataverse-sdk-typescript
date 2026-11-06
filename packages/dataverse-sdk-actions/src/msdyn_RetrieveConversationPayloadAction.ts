import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RetrieveConversationPayload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveConversationPayloadResponse {
  "@odata.context"?: string;
  ConversationPayload: string;
  Representative: string;
}

/**
 * Parameters of the msdyn_RetrieveConversationPayload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveConversationPayloadActionParameters {
  ConversationId: string;
  ParticipantScope?: number;
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
      ParticipantScope: this.parameters.ParticipantScope,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveConversationPayloadResponse;
  }
}
