import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AIReply action
 */
export interface AIReplyResponse {
  PreparedResponse: string;
}

/**
 * AIReply action
 *
 * Unbound action
 */
export class AIReplyAction implements Executable<AIReplyResponse> {
  constructor(public readonly text: string) {}

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
    return data as AIReplyResponse;
  }
}
