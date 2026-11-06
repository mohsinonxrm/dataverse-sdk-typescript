import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_RetrieveConversationPayloadResponse as msdyn_RetrieveConversationPayloadResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveConversationPayload request message
 *
 * Web API Action: msdyn_RetrieveConversationPayload
 */
export class msdyn_RetrieveConversationPayloadRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveConversationPayloadResponse>
{
  constructor(public conversationId: string) {
    super("msdyn_RetrieveConversationPayload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveConversationPayload`;

    const body: Record<string, unknown> = {
      ConversationId: this.conversationId,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveConversationPayloadResponse> {
    const data = await response.json();
    return msdyn_RetrieveConversationPayloadResponse.fromResponse(data);
  }
}

/**
 * msdyn_RetrieveConversationPayload response message
 */
export class msdyn_RetrieveConversationPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveConversationPayloadResponseData) {
    super("msdyn_RetrieveConversationPayload");
  }

  static fromResponse(data: unknown): msdyn_RetrieveConversationPayloadResponse {
    return new msdyn_RetrieveConversationPayloadResponse(
      responseObject<msdyn_RetrieveConversationPayloadResponseData>(data)
    );
  }
}
