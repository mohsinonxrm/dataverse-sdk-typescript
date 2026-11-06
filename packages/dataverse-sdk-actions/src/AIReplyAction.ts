import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AIReply action
 */
export interface AIReplyResponse {
  PreparedResponse: string;
}

/**
 * Parameters of the AIReply action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AIReplyActionParameters {
  Text: string;
}

/**
 * AIReply action
 *
 * Unbound action
 */
export class AIReplyAction implements Executable<AIReplyResponse> {
  constructor(public readonly parameters: AIReplyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIReply`;

    const body = requestBody({
      Text: this.parameters.Text,
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
    return (text ? JSON.parse(text) : {}) as AIReplyResponse;
  }
}
