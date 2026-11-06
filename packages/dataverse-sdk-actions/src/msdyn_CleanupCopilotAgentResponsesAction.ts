import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CleanupCopilotAgentResponses action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CleanupCopilotAgentResponsesResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_CleanupCopilotAgentResponsesResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
