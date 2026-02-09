import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrieveConversationPayload action
 */
export interface msdyn_RetrieveConversationPayloadResponse {
  ConversationPayload: string;
}

/**
 * msdyn_RetrieveConversationPayload action
 *
 * Unbound action
 */
export class msdyn_RetrieveConversationPayloadAction implements Executable<msdyn_RetrieveConversationPayloadResponse> {
  constructor(public readonly conversationId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveConversationPayload`;

    const body: Record<string, unknown> = {
      ConversationId: this.conversationId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrieveConversationPayloadResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveConversationPayloadResponse;
  }
}
