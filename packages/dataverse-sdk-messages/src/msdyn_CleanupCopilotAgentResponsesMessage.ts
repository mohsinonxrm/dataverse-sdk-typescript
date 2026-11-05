import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CleanupCopilotAgentResponses request message
 *
 * Web API Action: msdyn_CleanupCopilotAgentResponses
 */
export class msdyn_CleanupCopilotAgentResponsesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CleanupCopilotAgentResponsesResponse>
{
  constructor(
    public untilMarker: string,
    public conversationId: string
  ) {
    super("msdyn_CleanupCopilotAgentResponses");
  }

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
    return new msdyn_CleanupCopilotAgentResponsesResponse();
  }
}

/**
 * msdyn_CleanupCopilotAgentResponses response message
 */
export class msdyn_CleanupCopilotAgentResponsesResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CleanupCopilotAgentResponses");
  }

  static fromResponse(_data: unknown): msdyn_CleanupCopilotAgentResponsesResponse {
    return new msdyn_CleanupCopilotAgentResponsesResponse();
  }
}
