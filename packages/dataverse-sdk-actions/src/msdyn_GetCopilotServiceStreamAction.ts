import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetCopilotServiceStream action
 */
export interface msdyn_GetCopilotServiceStreamResponse {
  // No content returned
}

/**
 * msdyn_GetCopilotServiceStream action
 *
 * Unbound action
 */
export class msdyn_GetCopilotServiceStreamAction implements Executable<msdyn_GetCopilotServiceStreamResponse> {
  constructor(
    public readonly requestPayload: string,
    public readonly context: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCopilotServiceStream`;

    const body: Record<string, unknown> = {
      RequestPayload: this.requestPayload,
      Context: this.context,
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

  async parseResponse(response: Response): Promise<msdyn_GetCopilotServiceStreamResponse> {
    // No return value (204 No Content)
    return {};
  }
}
