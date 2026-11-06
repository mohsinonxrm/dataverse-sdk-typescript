import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_CloseConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CloseConversationRequestParameters {
  AgentId: string;
  LiveworkitemId: string;
  ActivityStatusCode: string;
}

/**
 * CCaaS_CloseConversation request message
 *
 * Web API Action: CCaaS_CloseConversation
 */
export class CCaaS_CloseConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CloseConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CloseConversationRequestParameters>;

  constructor(parameters: CCaaS_CloseConversationRequestParameters) {
    super("CCaaS_CloseConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CloseConversation`;

    const body = requestBody({
      AgentId: this.Parameters.AgentId,
      LiveworkitemId: this.Parameters.LiveworkitemId,
      ActivityStatusCode: this.Parameters.ActivityStatusCode,
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

  parseResponse(_response: Response): Promise<CCaaS_CloseConversationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_CloseConversationResponse());
  }
}

/**
 * CCaaS_CloseConversation response message
 */
export class CCaaS_CloseConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_CloseConversation");
  }

  static fromResponse(_data?: unknown): CCaaS_CloseConversationResponse {
    return new CCaaS_CloseConversationResponse();
  }
}
