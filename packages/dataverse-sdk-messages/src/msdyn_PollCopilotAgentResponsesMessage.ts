import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_PollCopilotAgentResponsesResponse as msdyn_PollCopilotAgentResponsesResponseData } from "./types/index.js";

/**
 * msdyn_PollCopilotAgentResponses request message
 *
 * Web API Action: msdyn_PollCopilotAgentResponses
 */
export class msdyn_PollCopilotAgentResponsesRequest
  extends OrganizationRequest
  implements Executable<msdyn_PollCopilotAgentResponsesResponse>
{
  constructor(
    public startMarker: string,
    public conversationId: string
  ) {
    super("msdyn_PollCopilotAgentResponses");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_PollCopilotAgentResponsesResponse> {
    const data = await response.json();
    return msdyn_PollCopilotAgentResponsesResponse.fromResponse(data);
  }
}

/**
 * msdyn_PollCopilotAgentResponses response message
 */
export class msdyn_PollCopilotAgentResponsesResponse extends OrganizationResponse {
  constructor(public result: msdyn_PollCopilotAgentResponsesResponseData) {
    super("msdyn_PollCopilotAgentResponses");
  }

  static fromResponse(data: unknown): msdyn_PollCopilotAgentResponsesResponse {
    return new msdyn_PollCopilotAgentResponsesResponse(
      responseObject<msdyn_PollCopilotAgentResponsesResponseData>(data)
    );
  }
}
