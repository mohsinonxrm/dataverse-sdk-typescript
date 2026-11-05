import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CleanupCopilotAgentResponses action
 */
export interface msdyn_CleanupCopilotAgentResponsesResponse {
  // No content returned
}

/**
 * msdyn_CleanupCopilotAgentResponses action
 *
 * Unbound action
 */
export class msdyn_CleanupCopilotAgentResponsesAction implements Executable<msdyn_CleanupCopilotAgentResponsesResponse> {
  constructor(
    public readonly untilMarker: string,
    public readonly conversationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanupCopilotAgentResponses`;

    const body: Record<string, unknown> = {
      UntilMarker: this.untilMarker,
      ConversationId: this.conversationId,
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

  async parseResponse(response: Response): Promise<msdyn_CleanupCopilotAgentResponsesResponse> {
    // No return value (204 No Content)
    return {};
  }
}
