import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AIReplyResponse as AIReplyResponseData } from "./types/index.js";

/**
 * Parameters of the AIReply message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AIReplyRequestParameters {
  Text: string;
}

/**
 * AIReply request message
 *
 * Web API Action: AIReply
 */
export class AIReplyRequest extends OrganizationRequest implements Executable<AIReplyResponse> {
  declare readonly Parameters: Readonly<AIReplyRequestParameters>;

  constructor(parameters: AIReplyRequestParameters) {
    super("AIReply", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIReply`;

    const body = requestBody({
      Text: this.Parameters.Text,
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

  async parseResponse(response: Response): Promise<AIReplyResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return AIReplyResponse.fromResponse(text ? JSON.parse(text) : {});
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
