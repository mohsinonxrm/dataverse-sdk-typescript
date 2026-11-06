import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_SendAgentTypingIndicatorResponse as CCaaS_SendAgentTypingIndicatorResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_SendAgentTypingIndicator message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SendAgentTypingIndicatorRequestParameters {
  AgentChatId: string;
  ApiVersion: string;
  AgentDisplayName: string;
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
      AgentChatId: this.Parameters.AgentChatId,
      ApiVersion: this.Parameters.ApiVersion,
      AgentDisplayName: this.Parameters.AgentDisplayName,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CCaaS_SendAgentTypingIndicatorResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * CCaaS_SendAgentTypingIndicator response message
 */
export class CCaaS_SendAgentTypingIndicatorResponse extends OrganizationResponse {
  constructor(public result: CCaaS_SendAgentTypingIndicatorResponseData) {
    super("CCaaS_SendAgentTypingIndicator");
  }

  static fromResponse(data: unknown): CCaaS_SendAgentTypingIndicatorResponse {
    return new CCaaS_SendAgentTypingIndicatorResponse(
      responseObject<CCaaS_SendAgentTypingIndicatorResponseData>(data)
    );
  }
}
