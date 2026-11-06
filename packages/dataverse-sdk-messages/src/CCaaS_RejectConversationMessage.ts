import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_RejectConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_RejectConversationRequestParameters {
  SessionId: string;
  RejectReason?: string;
  ApiVersion: string;
}

/**
 * CCaaS_RejectConversation request message
 *
 * Web API Action: CCaaS_RejectConversation
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_RejectConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_RejectConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_RejectConversationRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_RejectConversationRequestParameters
  ) {
    super("CCaaS_RejectConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_RejectConversation`;

    const body = requestBody({
      SessionId: this.Parameters.SessionId,
      RejectReason: this.Parameters.RejectReason,
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

  parseResponse(_response: Response): Promise<CCaaS_RejectConversationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_RejectConversationResponse());
  }
}

/**
 * CCaaS_RejectConversation response message
 */
export class CCaaS_RejectConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_RejectConversation");
  }

  static fromResponse(_data?: unknown): CCaaS_RejectConversationResponse {
    return new CCaaS_RejectConversationResponse();
  }
}
