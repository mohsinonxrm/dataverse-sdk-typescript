import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetKnowledgeDraftAssistStream action
 */
export interface msdyn_GetKnowledgeDraftAssistStreamResponse {
  // No content returned
}

/**
 * msdyn_GetKnowledgeDraftAssistStream action
 *
 * Unbound action
 */
export class msdyn_GetKnowledgeDraftAssistStreamAction implements Executable<msdyn_GetKnowledgeDraftAssistStreamResponse> {
  constructor(
    public readonly requestPayload: string,
    public readonly context?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKnowledgeDraftAssistStream`;

    const body: Record<string, unknown> = {
      RequestPayload: this.requestPayload,
      Context: this.context,
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

  async parseResponse(response: Response): Promise<msdyn_GetKnowledgeDraftAssistStreamResponse> {
    // No return value (204 No Content)
    return {};
  }
}
