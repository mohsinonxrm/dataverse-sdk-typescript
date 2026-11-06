import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_PollCopilotAgentResponses action
 */
export interface msdyn_PollCopilotAgentResponsesResponse {
  Response: string;
  ResponseMarker: string;
}

/**
 * Parameters of the msdyn_PollCopilotAgentResponses action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PollCopilotAgentResponsesActionParameters {
  ConversationId: string;
  StartMarker?: string;
}

/**
 * msdyn_PollCopilotAgentResponses action
 *
 * Unbound action
 */
export class msdyn_PollCopilotAgentResponsesAction implements Executable<msdyn_PollCopilotAgentResponsesResponse> {
  constructor(public readonly parameters: msdyn_PollCopilotAgentResponsesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PollCopilotAgentResponses`;

    const body = requestBody({
      ConversationId: this.parameters.ConversationId,
      StartMarker: this.parameters.StartMarker,
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

  async parseResponse(response: Response): Promise<msdyn_PollCopilotAgentResponsesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_PollCopilotAgentResponsesResponse;
    return (await response.json()) as msdyn_PollCopilotAgentResponsesResponse;
  }
}
