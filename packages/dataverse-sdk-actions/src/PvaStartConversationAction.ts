import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from PvaStartConversation action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface PvaStartConversationResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * PvaStartConversation action
 *
 * Unbound action
 */
export class PvaStartConversationAction implements Executable<PvaStartConversationResponse> {
  constructor(
    public readonly version: string,
    public readonly request: EntityReference | AnyEntityPayload
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
