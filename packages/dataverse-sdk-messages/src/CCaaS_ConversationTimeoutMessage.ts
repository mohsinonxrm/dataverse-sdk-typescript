import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_ConversationTimeout message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ConversationTimeoutRequestParameters {
  SessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_ConversationTimeout request message
 *
 * Web API Action: CCaaS_ConversationTimeout
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_ConversationTimeoutRequest
  extends OrganizationRequest
  implements Executable<CCaaS_ConversationTimeoutResponse>
{
  declare readonly Parameters: Readonly<CCaaS_ConversationTimeoutRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_ConversationTimeoutRequestParameters
  ) {
    super("CCaaS_ConversationTimeout", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_ConversationTimeout`;

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

  async parseResponse(response: Response): Promise<CCaaS_ConversationTimeoutResponse> {
    // No return value (204 No Content)
    return new CCaaS_ConversationTimeoutResponse();
  }
}

/**
 * CCaaS_ConversationTimeout response message
 */
export class CCaaS_ConversationTimeoutResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_ConversationTimeout");
  }

  static fromResponse(_data: unknown): CCaaS_ConversationTimeoutResponse {
    return new CCaaS_ConversationTimeoutResponse();
  }
}
