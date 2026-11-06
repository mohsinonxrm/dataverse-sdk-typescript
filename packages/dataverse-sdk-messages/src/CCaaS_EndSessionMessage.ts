import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_EndSession message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_EndSessionRequestParameters {
  SessionId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_EndSession request message
 *
 * Web API Action: CCaaS_EndSession
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_EndSessionRequest
  extends OrganizationRequest
  implements Executable<CCaaS_EndSessionResponse>
{
  declare readonly Parameters: Readonly<CCaaS_EndSessionRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_EndSessionRequestParameters
  ) {
    super("CCaaS_EndSession", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_EndSession`;

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

  parseResponse(_response: Response): Promise<CCaaS_EndSessionResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_EndSessionResponse());
  }
}

/**
 * CCaaS_EndSession response message
 */
export class CCaaS_EndSessionResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_EndSession");
  }

  static fromResponse(_data?: unknown): CCaaS_EndSessionResponse {
    return new CCaaS_EndSessionResponse();
  }
}
