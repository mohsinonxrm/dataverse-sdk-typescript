import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_CancelConsult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CancelConsultRequestParameters {
  SessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_CancelConsult request message
 *
 * Web API Action: CCaaS_CancelConsult
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_CancelConsultRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CancelConsultResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CancelConsultRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_CancelConsultRequestParameters
  ) {
    super("CCaaS_CancelConsult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_CancelConsult`;

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

  parseResponse(_response: Response): Promise<CCaaS_CancelConsultResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_CancelConsultResponse());
  }
}

/**
 * CCaaS_CancelConsult response message
 */
export class CCaaS_CancelConsultResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_CancelConsult");
  }

  static fromResponse(_data?: unknown): CCaaS_CancelConsultResponse {
    return new CCaaS_CancelConsultResponse();
  }
}
