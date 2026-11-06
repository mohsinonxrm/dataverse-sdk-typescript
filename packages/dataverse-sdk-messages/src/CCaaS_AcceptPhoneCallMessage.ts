import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_AcceptPhoneCall message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_AcceptPhoneCallRequestParameters {
  ApiVersion: string;
  SessionId: string;
}

/**
 * CCaaS_AcceptPhoneCall request message
 *
 * Web API Action: CCaaS_AcceptPhoneCall
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_AcceptPhoneCallRequest
  extends OrganizationRequest
  implements Executable<CCaaS_AcceptPhoneCallResponse>
{
  declare readonly Parameters: Readonly<CCaaS_AcceptPhoneCallRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_AcceptPhoneCallRequestParameters
  ) {
    super("CCaaS_AcceptPhoneCall", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AcceptPhoneCall`;

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

  parseResponse(_response: Response): Promise<CCaaS_AcceptPhoneCallResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_AcceptPhoneCallResponse());
  }
}

/**
 * CCaaS_AcceptPhoneCall response message
 */
export class CCaaS_AcceptPhoneCallResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_AcceptPhoneCall");
  }

  static fromResponse(_data?: unknown): CCaaS_AcceptPhoneCallResponse {
    return new CCaaS_AcceptPhoneCallResponse();
  }
}
