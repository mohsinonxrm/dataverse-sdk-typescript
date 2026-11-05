import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from GetLinkedChats action
 */
export interface GetLinkedChatsResponse {
  LinkedChatDetails: string;
}

/**
 * GetLinkedChats action
 *
 * Unbound action
 */
export class GetLinkedChatsAction implements Executable<GetLinkedChatsResponse> {
  constructor(public readonly regardingEntity: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetLinkedChats`;

    const body: Record<string, unknown> = {
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

  async parseResponse(response: Response): Promise<GetLinkedChatsResponse> {
    const data = await response.json();
    return data as GetLinkedChatsResponse;
  }
}
