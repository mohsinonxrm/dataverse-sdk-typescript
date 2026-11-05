import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from PvaStartConversation action
 */
export interface PvaStartConversationResponse {
  value: EntityReference;
}

/**
 * PvaStartConversation action
 *
 * Unbound action
 */
export class PvaStartConversationAction implements Executable<PvaStartConversationResponse> {
  constructor(
    public readonly version: string,
    public readonly request: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PvaStartConversation`;

    const body: Record<string, unknown> = {
      Version: this.version,
      Request: this.request,
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

  async parseResponse(response: Response): Promise<PvaStartConversationResponse> {
    const data = await response.json();
    return data as PvaStartConversationResponse;
  }
}
