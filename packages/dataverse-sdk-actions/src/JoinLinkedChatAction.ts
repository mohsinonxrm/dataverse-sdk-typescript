import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from JoinLinkedChat action
 */
export interface JoinLinkedChatResponse {
  // No content returned
}

/**
 * JoinLinkedChat action
 *
 * Unbound action
 */
export class JoinLinkedChatAction implements Executable<JoinLinkedChatResponse> {
  constructor(
    public readonly teamsChatId: string,
    public readonly userId: string,
    public readonly regardingEntity: EntityReference
  ) {}

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
    return {};
  }
}
