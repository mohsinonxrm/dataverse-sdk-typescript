import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_sendFeedback action
 */
export interface msdyn_sendFeedbackResponse {
  // No content returned
}

/**
 * msdyn_sendFeedback action
 *
 * Unbound action
 */
export class msdyn_sendFeedbackAction implements Executable<msdyn_sendFeedbackResponse> {
  constructor(public readonly content: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_sendFeedback`;

    const body: Record<string, unknown> = {
      content: this.content,
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

  async parseResponse(response: Response): Promise<msdyn_sendFeedbackResponse> {
    // No return value (204 No Content)
    return {};
  }
}
