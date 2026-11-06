import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_PollCopilotAgentResponsesResponse as msdyn_PollCopilotAgentResponsesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_PollCopilotAgentResponses message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PollCopilotAgentResponsesRequestParameters {
  ConversationId: string;
  StartMarker?: string;
}

/**
 * msdyn_PollCopilotAgentResponses request message
 *
 * Web API Action: msdyn_PollCopilotAgentResponses
 */
export class msdyn_PollCopilotAgentResponsesRequest
  extends OrganizationRequest
  implements Executable<msdyn_PollCopilotAgentResponsesResponse>
{
  declare readonly Parameters: Readonly<msdyn_PollCopilotAgentResponsesRequestParameters>;

  constructor(parameters: msdyn_PollCopilotAgentResponsesRequestParameters) {
    super("msdyn_PollCopilotAgentResponses", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PollCopilotAgentResponses`;

    const body = requestBody({
      ConversationId: this.Parameters.ConversationId,
      StartMarker: this.Parameters.StartMarker,
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
    if (response.status === 204) return msdyn_PollCopilotAgentResponsesResponse.fromResponse({});
    return msdyn_PollCopilotAgentResponsesResponse.fromResponse(await response.json());
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
