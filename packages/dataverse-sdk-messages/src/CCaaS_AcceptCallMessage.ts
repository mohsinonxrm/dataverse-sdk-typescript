import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_AcceptCall message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_AcceptCallRequestParameters {
  CallId?: string;
  SessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_AcceptCall request message
 *
 * Web API Action: CCaaS_AcceptCall
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_AcceptCallRequest
  extends OrganizationRequest
  implements Executable<CCaaS_AcceptCallResponse>
{
  declare readonly Parameters: Readonly<CCaaS_AcceptCallRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_AcceptCallRequestParameters
  ) {
    super("CCaaS_AcceptCall", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AcceptCall`;

    const body = requestBody({
      CallId: this.Parameters.CallId,
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

  parseResponse(_response: Response): Promise<CCaaS_AcceptCallResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_AcceptCallResponse());
  }
}

/**
 * CCaaS_AcceptCall response message
 */
export class CCaaS_AcceptCallResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_AcceptCall");
  }

  static fromResponse(_data?: unknown): CCaaS_AcceptCallResponse {
    return new CCaaS_AcceptCallResponse();
  }
}
