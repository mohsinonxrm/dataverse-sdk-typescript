import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_LeavePublicConsult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_LeavePublicConsultRequestParameters {
  ApiVersion: string;
}

/**
 * CCaaS_LeavePublicConsult request message
 *
 * Web API Action: CCaaS_LeavePublicConsult
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_LeavePublicConsultRequest
  extends OrganizationRequest
  implements Executable<CCaaS_LeavePublicConsultResponse>
{
  declare readonly Parameters: Readonly<CCaaS_LeavePublicConsultRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_LeavePublicConsultRequestParameters
  ) {
    super("CCaaS_LeavePublicConsult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_LeavePublicConsult`;

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

  parseResponse(_response: Response): Promise<CCaaS_LeavePublicConsultResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_LeavePublicConsultResponse());
  }
}

/**
 * CCaaS_LeavePublicConsult response message
 */
export class CCaaS_LeavePublicConsultResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_LeavePublicConsult");
  }

  static fromResponse(_data?: unknown): CCaaS_LeavePublicConsultResponse {
    return new CCaaS_LeavePublicConsultResponse();
  }
}
