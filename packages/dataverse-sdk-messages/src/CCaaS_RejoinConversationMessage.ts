import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_RejoinConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_RejoinConversationRequestParameters {
  ClientId?: string;
  ApiVersion: string;
  SessionId?: string;
}

/**
 * CCaaS_RejoinConversation request message
 *
 * Web API Action: CCaaS_RejoinConversation
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_RejoinConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_RejoinConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_RejoinConversationRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_RejoinConversationRequestParameters
  ) {
    super("CCaaS_RejoinConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_RejoinConversation`;

    const body = requestBody({
      ClientId: this.Parameters.ClientId,
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

  parseResponse(_response: Response): Promise<CCaaS_RejoinConversationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_RejoinConversationResponse());
  }
}

/**
 * CCaaS_RejoinConversation response message
 */
export class CCaaS_RejoinConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_RejoinConversation");
  }

  static fromResponse(_data?: unknown): CCaaS_RejoinConversationResponse {
    return new CCaaS_RejoinConversationResponse();
  }
}
