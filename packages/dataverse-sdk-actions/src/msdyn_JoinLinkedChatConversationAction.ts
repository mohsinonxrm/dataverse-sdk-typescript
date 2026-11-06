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
  msdyn_TeamsConversationId: string;
  msdyn_RegardingEntityId: string;
  msdyn_UserId?: string;
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
      msdyn_TeamsConversationId: this.parameters.msdyn_TeamsConversationId,
      msdyn_RegardingEntityId: this.parameters.msdyn_RegardingEntityId,
      msdyn_UserId: this.parameters.msdyn_UserId,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_JoinLinkedChatConversationResponse;
    return (await response.json()) as msdyn_JoinLinkedChatConversationResponse;
  }
}
