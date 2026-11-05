import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { AIReplyResponse as AIReplyResponseData } from "./types/index.js";

/**
 * AIReply request message
 *
 * Web API Action: AIReply
 */
export class AIReplyRequest extends OrganizationRequest implements Executable<AIReplyResponse> {
  constructor(public text: string) {
    super("AIReply");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIReply`;

    const body: Record<string, unknown> = {
      Text: this.text,
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

  async parseResponse(response: Response): Promise<AIReplyResponse> {
    const data = await response.json();
    return AIReplyResponse.fromResponse(data);
  }
}

/**
 * AIReply response message
 */
export class AIReplyResponse extends OrganizationResponse {
  constructor(public result: AIReplyResponseData) {
    super("AIReply");
  }

  static fromResponse(data: unknown): AIReplyResponse {
    return new AIReplyResponse(responseObject<AIReplyResponseData>(data));
  }
}
