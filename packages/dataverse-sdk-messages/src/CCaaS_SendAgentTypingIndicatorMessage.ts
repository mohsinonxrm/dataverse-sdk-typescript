import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_SendAgentTypingIndicator message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SendAgentTypingIndicatorRequestParameters {
  ApiVersion: string;
  AgentDisplayName: string;
  AgentChatId: string;
}

/**
 * CCaaS_SendAgentTypingIndicator request message
 *
 * Web API Action: CCaaS_SendAgentTypingIndicator
 */
export class CCaaS_SendAgentTypingIndicatorRequest
  extends OrganizationRequest
  implements Executable<CCaaS_SendAgentTypingIndicatorResponse>
{
  declare readonly Parameters: Readonly<CCaaS_SendAgentTypingIndicatorRequestParameters>;

  constructor(parameters: CCaaS_SendAgentTypingIndicatorRequestParameters) {
    super("CCaaS_SendAgentTypingIndicator", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SendAgentTypingIndicator`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      AgentDisplayName: this.Parameters.AgentDisplayName,
      AgentChatId: this.Parameters.AgentChatId,
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

  async parseResponse(response: Response): Promise<CCaaS_SendAgentTypingIndicatorResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_SendAgentTypingIndicatorResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_SendAgentTypingIndicator action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_SendAgentTypingIndicatorResult {
  "@odata.context"?: string;
  ResponseBody: string;
}

/**
 * CCaaS_SendAgentTypingIndicator response message
 *
 * `result` is the value the CCaaS_SendAgentTypingIndicator action returns (see {@link CCaaS_SendAgentTypingIndicatorResult}).
 */
export class CCaaS_SendAgentTypingIndicatorResponse extends OrganizationResponse {
  constructor(public result: CCaaS_SendAgentTypingIndicatorResult) {
    super("CCaaS_SendAgentTypingIndicator");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_SendAgentTypingIndicatorResponse {
    return new CCaaS_SendAgentTypingIndicatorResponse(data as CCaaS_SendAgentTypingIndicatorResult);
  }
}
