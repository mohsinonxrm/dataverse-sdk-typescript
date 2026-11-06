import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetEmailAssistStream action
 */
export interface msdyn_GetEmailAssistStreamResponse {
  // No content returned
}

/**
 * msdyn_GetEmailAssistStream action
 *
 * Unbound action
 */
export class msdyn_GetEmailAssistStreamAction implements Executable<msdyn_GetEmailAssistStreamResponse> {
  constructor(
    public readonly context: string | undefined,
    public readonly requestPayload: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEmailAssistStream`;

    const body: Record<string, unknown> = {
      Context: this.context,
      RequestPayload: this.requestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_GetEmailAssistStreamResponse> {
    // No return value (204 No Content)
    return {};
  }
}
