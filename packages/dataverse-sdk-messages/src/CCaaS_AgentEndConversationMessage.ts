import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_AgentEndConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_AgentEndConversationRequestParameters {
  ApiVersion: string;
  SessionId: string;
}

/**
 * CCaaS_AgentEndConversation request message
 *
 * Web API Action: CCaaS_AgentEndConversation
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_AgentEndConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_AgentEndConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_AgentEndConversationRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_AgentEndConversationRequestParameters
  ) {
    super("CCaaS_AgentEndConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AgentEndConversation`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      SessionId: this.Parameters.SessionId,
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

  parseResponse(_response: Response): Promise<CCaaS_AgentEndConversationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_AgentEndConversationResponse());
  }
}

/**
 * CCaaS_AgentEndConversation response message
 */
export class CCaaS_AgentEndConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_AgentEndConversation");
  }

  static fromResponse(_data?: unknown): CCaaS_AgentEndConversationResponse {
    return new CCaaS_AgentEndConversationResponse();
  }
}
