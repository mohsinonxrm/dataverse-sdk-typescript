import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_JoinLinkedChatConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_JoinLinkedChatConversationRequestParameters {
  msdyn_TeamsConversationId: string;
  msdyn_RegardingEntityId: string;
  msdyn_UserId?: string;
}

/**
 * msdyn_JoinLinkedChatConversation request message
 *
 * Web API Action: msdyn_JoinLinkedChatConversation
 */
export class msdyn_JoinLinkedChatConversationRequest
  extends OrganizationRequest
  implements Executable<msdyn_JoinLinkedChatConversationResponse>
{
  declare readonly Parameters: Readonly<msdyn_JoinLinkedChatConversationRequestParameters>;

  constructor(parameters: msdyn_JoinLinkedChatConversationRequestParameters) {
    super("msdyn_JoinLinkedChatConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JoinLinkedChatConversation`;

    const body = requestBody({
      msdyn_TeamsConversationId: this.Parameters.msdyn_TeamsConversationId,
      msdyn_RegardingEntityId: this.Parameters.msdyn_RegardingEntityId,
      msdyn_UserId: this.Parameters.msdyn_UserId,
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

  parseResponse(_response: Response): Promise<msdyn_JoinLinkedChatConversationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_JoinLinkedChatConversationResponse());
  }
}

/**
 * msdyn_JoinLinkedChatConversation response message
 */
export class msdyn_JoinLinkedChatConversationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_JoinLinkedChatConversation");
  }

  static fromResponse(_data?: unknown): msdyn_JoinLinkedChatConversationResponse {
    return new msdyn_JoinLinkedChatConversationResponse();
  }
}
