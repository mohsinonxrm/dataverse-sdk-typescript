import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AIReplyResponse> {
    const data = await response.json();
    return AIReplyResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Text: this.text,
    };
  }
}

/**
 * AIReply response message
 */
export class AIReplyResponse extends OrganizationResponse {
  constructor(public result: AIReplyResponse) {
    super("AIReply");
  }

  static fromResponse(data: unknown): AIReplyResponse {
    return new AIReplyResponse((data as any).value);
  }
}
