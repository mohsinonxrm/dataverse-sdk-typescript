import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_AssignConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_AssignConversationRequestParameters {
  ApiVersion: string;
  AgentId: string;
}

/**
 * CCaaS_AssignConversation request message
 *
 * Web API Action: CCaaS_AssignConversation
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_AssignConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_AssignConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_AssignConversationRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_AssignConversationRequestParameters
  ) {
    super("CCaaS_AssignConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AssignConversation`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      AgentId: this.Parameters.AgentId,
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

  async parseResponse(response: Response): Promise<CCaaS_AssignConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_AssignConversationResponse();
  }
}

/**
 * CCaaS_AssignConversation response message
 */
export class CCaaS_AssignConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_AssignConversation");
  }

  static fromResponse(_data: unknown): CCaaS_AssignConversationResponse {
    return new CCaaS_AssignConversationResponse();
  }
}
