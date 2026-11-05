import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAgentAssistStream action
 */
export interface msdyn_GetAgentAssistStreamResponse {
  Result: string[];
}

/**
 * msdyn_GetAgentAssistStream action
 *
 * Unbound action
 */
export class msdyn_GetAgentAssistStreamAction implements Executable<msdyn_GetAgentAssistStreamResponse> {
  constructor(
    public readonly context: string,
    public readonly requestPayload: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAgentAssistStream`;

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

  async parseResponse(response: Response): Promise<msdyn_GetAgentAssistStreamResponse> {
    const data = await response.json();
    return data as msdyn_GetAgentAssistStreamResponse;
  }
}
