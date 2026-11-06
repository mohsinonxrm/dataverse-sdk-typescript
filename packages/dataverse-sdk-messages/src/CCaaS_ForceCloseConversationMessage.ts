import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_ForceCloseConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ForceCloseConversationRequestParameters {
  ApiVersion: string;
}

/**
 * CCaaS_ForceCloseConversation request message
 *
 * Web API Action: CCaaS_ForceCloseConversation
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_ForceCloseConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_ForceCloseConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_ForceCloseConversationRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_ForceCloseConversationRequestParameters
  ) {
    super("CCaaS_ForceCloseConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_ForceCloseConversation`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<CCaaS_ForceCloseConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_ForceCloseConversationResponse();
  }
}

/**
 * CCaaS_ForceCloseConversation response message
 */
export class CCaaS_ForceCloseConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_ForceCloseConversation");
  }

  static fromResponse(_data: unknown): CCaaS_ForceCloseConversationResponse {
    return new CCaaS_ForceCloseConversationResponse();
  }
}
