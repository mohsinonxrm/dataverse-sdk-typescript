import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_PickConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_PickConversationRequestParameters {
  ApiVersion: string;
}

/**
 * CCaaS_PickConversation request message
 *
 * Web API Action: CCaaS_PickConversation
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_PickConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_PickConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_PickConversationRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_PickConversationRequestParameters
  ) {
    super("CCaaS_PickConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_PickConversation`;

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

  async parseResponse(response: Response): Promise<CCaaS_PickConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_PickConversationResponse();
  }
}

/**
 * CCaaS_PickConversation response message
 */
export class CCaaS_PickConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_PickConversation");
  }

  static fromResponse(_data: unknown): CCaaS_PickConversationResponse {
    return new CCaaS_PickConversationResponse();
  }
}
