import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_MonitorConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_MonitorConversationRequestParameters {
  ApiVersion: string;
  ClientId?: string;
}

/**
 * CCaaS_MonitorConversation request message
 *
 * Web API Action: CCaaS_MonitorConversation
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_MonitorConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_MonitorConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_MonitorConversationRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_MonitorConversationRequestParameters
  ) {
    super("CCaaS_MonitorConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_MonitorConversation`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      ClientId: this.Parameters.ClientId,
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

  async parseResponse(response: Response): Promise<CCaaS_MonitorConversationResponse> {
    // No return value (204 No Content)
    return new CCaaS_MonitorConversationResponse();
  }
}

/**
 * CCaaS_MonitorConversation response message
 */
export class CCaaS_MonitorConversationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_MonitorConversation");
  }

  static fromResponse(_data: unknown): CCaaS_MonitorConversationResponse {
    return new CCaaS_MonitorConversationResponse();
  }
}
