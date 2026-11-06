import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";

/**
 * PvaStartConversation request message
 *
 * Web API Action: PvaStartConversation
 */
export class PvaStartConversationRequest
  extends OrganizationRequest
  implements Executable<PvaStartConversationResponse>
{
  constructor(
    public version: string,
    public request: EntityReference
  ) {
    super("PvaStartConversation");
  }

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
    return PvaStartConversationResponse.fromResponse(data);
  }
}

/**
 * PvaStartConversation response message
 */
export class PvaStartConversationResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("PvaStartConversation");
  }

  static fromResponse(data: unknown): PvaStartConversationResponse {
    return new PvaStartConversationResponse(responseObject<Record<string, unknown>>(data));
  }
}
