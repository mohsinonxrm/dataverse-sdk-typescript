import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_JoinConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_JoinConversationRequestParameters {
  ApiVersion: string;
  SessionId: string;
  ClientId?: string;
  ConversationAccess?: number;
}

/**
 * CCaaS_JoinConversation request message
 *
 * Web API Action: CCaaS_JoinConversation
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_JoinConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_JoinConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_JoinConversationRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_JoinConversationRequestParameters
  ) {
    super("CCaaS_JoinConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_JoinConversation`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      SessionId: this.Parameters.SessionId,
      ClientId: this.Parameters.ClientId,
      ConversationAccess: this.Parameters.ConversationAccess,
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

  async parseResponse(response: Response): Promise<CCaaS_JoinConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_JoinConversationResponse();
  }
}

/**
 * CCaaS_JoinConversation response message
 */
export class CCaaS_JoinConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_JoinConversation");
  }

  static fromResponse(_data: unknown): CCaaS_JoinConversationResponse {
    return new CCaaS_JoinConversationResponse();
  }
}
