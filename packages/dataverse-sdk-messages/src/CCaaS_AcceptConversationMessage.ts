import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_AcceptConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_AcceptConversationRequestParameters {
  SessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_AcceptConversation request message
 *
 * Web API Action: CCaaS_AcceptConversation
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_AcceptConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_AcceptConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_AcceptConversationRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_AcceptConversationRequestParameters
  ) {
    super("CCaaS_AcceptConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AcceptConversation`;

    const body = requestBody({
      SessionId: this.Parameters.SessionId,
      ApiVersion: this.Parameters.ApiVersion,
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

  parseResponse(_response: Response): Promise<CCaaS_AcceptConversationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_AcceptConversationResponse());
  }
}

/**
 * CCaaS_AcceptConversation response message
 */
export class CCaaS_AcceptConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_AcceptConversation");
  }

  static fromResponse(_data?: unknown): CCaaS_AcceptConversationResponse {
    return new CCaaS_AcceptConversationResponse();
  }
}
