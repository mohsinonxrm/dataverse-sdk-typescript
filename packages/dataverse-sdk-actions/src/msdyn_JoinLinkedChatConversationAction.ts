import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_JoinLinkedChatConversation action
 */
export interface msdyn_JoinLinkedChatConversationResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_JoinLinkedChatConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_JoinLinkedChatConversationActionParameters {
  msdyn_UserId?: string;
  msdyn_RegardingEntityId: string;
  msdyn_TeamsConversationId: string;
}

/**
 * msdyn_JoinLinkedChatConversation action
 *
 * Unbound action
 */
export class msdyn_JoinLinkedChatConversationAction implements Executable<msdyn_JoinLinkedChatConversationResponse> {
  constructor(public readonly parameters: msdyn_JoinLinkedChatConversationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JoinLinkedChatConversation`;

    const body = requestBody({
      msdyn_UserId: this.parameters.msdyn_UserId,
      msdyn_RegardingEntityId: this.parameters.msdyn_RegardingEntityId,
      msdyn_TeamsConversationId: this.parameters.msdyn_TeamsConversationId,
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

  async parseResponse(response: Response): Promise<msdyn_JoinLinkedChatConversationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_JoinLinkedChatConversationResponse;
  }
}
