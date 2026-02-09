import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PollCopilotAgentResponses action
 */
export interface msdyn_PollCopilotAgentResponsesResponse {
  Response: string;
  ResponseMarker: string;
}

/**
 * msdyn_PollCopilotAgentResponses action
 *
 * Unbound action
 */
export class msdyn_PollCopilotAgentResponsesAction implements Executable<msdyn_PollCopilotAgentResponsesResponse> {
  constructor(
    public readonly startMarker: string,
    public readonly conversationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PollCopilotAgentResponses`;

    const body: Record<string, unknown> = {
      StartMarker: this.startMarker,
      ConversationId: this.conversationId,
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

  async parseResponse(response: Response): Promise<msdyn_PollCopilotAgentResponsesResponse> {
    const data = await response.json();
    return data as msdyn_PollCopilotAgentResponsesResponse;
  }
}
