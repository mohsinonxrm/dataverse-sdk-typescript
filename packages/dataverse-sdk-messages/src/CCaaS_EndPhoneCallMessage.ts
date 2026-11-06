import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_EndPhoneCall message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_EndPhoneCallRequestParameters {
  SessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_EndPhoneCall request message
 *
 * Web API Action: CCaaS_EndPhoneCall
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_EndPhoneCallRequest
  extends OrganizationRequest
  implements Executable<CCaaS_EndPhoneCallResponse>
{
  declare readonly Parameters: Readonly<CCaaS_EndPhoneCallRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_EndPhoneCallRequestParameters
  ) {
    super("CCaaS_EndPhoneCall", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_EndPhoneCall`;

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

  parseResponse(_response: Response): Promise<CCaaS_EndPhoneCallResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_EndPhoneCallResponse());
  }
}

/**
 * CCaaS_EndPhoneCall response message
 */
export class CCaaS_EndPhoneCallResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_EndPhoneCall");
  }

  static fromResponse(_data?: unknown): CCaaS_EndPhoneCallResponse {
    return new CCaaS_EndPhoneCallResponse();
  }
}
