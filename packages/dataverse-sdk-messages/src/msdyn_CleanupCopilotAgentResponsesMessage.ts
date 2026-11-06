import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CleanupCopilotAgentResponses message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CleanupCopilotAgentResponsesRequestParameters {
  UntilMarker?: string;
  ConversationId?: string;
}

/**
 * msdyn_CleanupCopilotAgentResponses request message
 *
 * Web API Action: msdyn_CleanupCopilotAgentResponses
 */
export class msdyn_CleanupCopilotAgentResponsesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CleanupCopilotAgentResponsesResponse>
{
  declare readonly Parameters: Readonly<msdyn_CleanupCopilotAgentResponsesRequestParameters>;

  constructor(parameters: msdyn_CleanupCopilotAgentResponsesRequestParameters = {}) {
    super("msdyn_CleanupCopilotAgentResponses", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanupCopilotAgentResponses`;

    const body = requestBody({
      UntilMarker: this.Parameters.UntilMarker,
      ConversationId: this.Parameters.ConversationId,
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
