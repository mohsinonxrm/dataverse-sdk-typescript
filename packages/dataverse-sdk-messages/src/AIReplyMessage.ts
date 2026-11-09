import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return AIReplyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AIReply action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AIReplyResult {
  "@odata.context"?: string;
  PreparedResponse: string;
}

/**
 * AIReply response message
 *
 * `result` is the value the AIReply action returns (see {@link AIReplyResult}).
 */
export class AIReplyResponse extends OrganizationResponse {
  constructor(public result: AIReplyResult) {
    super("AIReply");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AIReplyResponse {
    return new AIReplyResponse(data as AIReplyResult);
  }
}
