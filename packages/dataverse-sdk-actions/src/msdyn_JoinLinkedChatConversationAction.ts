import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_JoinLinkedChatConversation action
 */
export interface msdyn_JoinLinkedChatConversationResponse {
  // No content returned
}

/**
 * msdyn_JoinLinkedChatConversation action
 *
 * Unbound action
 */
export class msdyn_JoinLinkedChatConversationAction implements Executable<msdyn_JoinLinkedChatConversationResponse> {
  constructor(
    public readonly msdyn_UserId: string | undefined,
    public readonly msdyn_RegardingEntityId: string,
    public readonly msdyn_TeamsConversationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JoinLinkedChatConversation`;

    const body: Record<string, unknown> = {
      msdyn_UserId: this.msdyn_UserId,
      msdyn_RegardingEntityId: this.msdyn_RegardingEntityId,
      msdyn_TeamsConversationId: this.msdyn_TeamsConversationId,
    };

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
    // No return value (204 No Content)
    return {};
  }
}
