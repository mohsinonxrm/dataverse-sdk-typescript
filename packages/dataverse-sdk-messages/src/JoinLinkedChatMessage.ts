import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * JoinLinkedChat request message
 *
 * Web API Action: JoinLinkedChat
 */
export class JoinLinkedChatRequest
  extends OrganizationRequest
  implements Executable<JoinLinkedChatResponse>
{
  constructor(
    public teamsChatId: string,
    public userId: string,
    public regardingEntity: EntityReference
  ) {
    super("JoinLinkedChat");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/JoinLinkedChat`;

    const body: Record<string, unknown> = {
      TeamsChatId: this.teamsChatId,
      UserId: this.userId,
      RegardingEntity: this.regardingEntity,
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

  async parseResponse(response: Response): Promise<JoinLinkedChatResponse> {
    // No return value (204 No Content)
    return new JoinLinkedChatResponse();
  }
}

/**
 * JoinLinkedChat response message
 */
export class JoinLinkedChatResponse extends OrganizationResponse {
  constructor() {
    super("JoinLinkedChat");
  }

  static fromResponse(_data: unknown): JoinLinkedChatResponse {
    return new JoinLinkedChatResponse();
  }
}
