import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_CloseConsult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CloseConsultRequestParameters {
  ApiVersion: string;
}

/**
 * CCaaS_CloseConsult request message
 *
 * Web API Action: CCaaS_CloseConsult
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_CloseConsultRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CloseConsultResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CloseConsultRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_CloseConsultRequestParameters
  ) {
    super("CCaaS_CloseConsult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_CloseConsult`;

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

  parseResponse(_response: Response): Promise<CCaaS_CloseConsultResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_CloseConsultResponse());
  }
}

/**
 * CCaaS_CloseConsult response message
 */
export class CCaaS_CloseConsultResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_CloseConsult");
  }

  static fromResponse(_data?: unknown): CCaaS_CloseConsultResponse {
    return new CCaaS_CloseConsultResponse();
  }
}
