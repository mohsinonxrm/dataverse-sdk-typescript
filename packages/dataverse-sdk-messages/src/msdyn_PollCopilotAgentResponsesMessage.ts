import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_PollCopilotAgentResponsesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_PollCopilotAgentResponses action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_PollCopilotAgentResponsesResult {
  "@odata.context"?: string;
  Response: string;
  ResponseMarker: string;
}

/**
 * msdyn_PollCopilotAgentResponses response message
 *
 * `result` is the value the msdyn_PollCopilotAgentResponses action returns (see {@link msdyn_PollCopilotAgentResponsesResult}).
 */
export class msdyn_PollCopilotAgentResponsesResponse extends OrganizationResponse {
  constructor(public result: msdyn_PollCopilotAgentResponsesResult) {
    super("msdyn_PollCopilotAgentResponses");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_PollCopilotAgentResponsesResponse {
    return new msdyn_PollCopilotAgentResponsesResponse(
      data as msdyn_PollCopilotAgentResponsesResult
    );
  }
}
