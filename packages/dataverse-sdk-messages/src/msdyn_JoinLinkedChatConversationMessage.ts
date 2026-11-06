import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_JoinLinkedChatConversation request message
 *
 * Web API Action: msdyn_JoinLinkedChatConversation
 */
export class msdyn_JoinLinkedChatConversationRequest
  extends OrganizationRequest
  implements Executable<msdyn_JoinLinkedChatConversationResponse>
{
  constructor(
    public msdyn_UserId: string | undefined,
    public msdyn_RegardingEntityId: string,
    public msdyn_TeamsConversationId: string
  ) {
    super("msdyn_JoinLinkedChatConversation");
  }

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
    return new msdyn_JoinLinkedChatConversationResponse();
  }
}

/**
 * msdyn_JoinLinkedChatConversation response message
 */
export class msdyn_JoinLinkedChatConversationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_JoinLinkedChatConversation");
  }

  static fromResponse(_data: unknown): msdyn_JoinLinkedChatConversationResponse {
    return new msdyn_JoinLinkedChatConversationResponse();
  }
}
