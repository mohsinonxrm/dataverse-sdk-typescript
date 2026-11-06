import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CleanupCopilotAgentResponses action
 */
export interface msdyn_CleanupCopilotAgentResponsesResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_CleanupCopilotAgentResponses action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CleanupCopilotAgentResponsesActionParameters {
  ConversationId?: string;
  UntilMarker?: string;
}

/**
 * msdyn_CleanupCopilotAgentResponses action
 *
 * Unbound action
 */
export class msdyn_CleanupCopilotAgentResponsesAction implements Executable<msdyn_CleanupCopilotAgentResponsesResponse> {
  constructor(
    public readonly parameters: msdyn_CleanupCopilotAgentResponsesActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanupCopilotAgentResponses`;

    const body = requestBody({
      ConversationId: this.parameters.ConversationId,
      UntilMarker: this.parameters.UntilMarker,
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

  async parseResponse(response: Response): Promise<msdyn_CleanupCopilotAgentResponsesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CleanupCopilotAgentResponsesResponse;
    return (await response.json()) as msdyn_CleanupCopilotAgentResponsesResponse;
  }
}
