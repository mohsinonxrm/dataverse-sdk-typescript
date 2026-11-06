import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateReroute message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateRerouteRequestParameters {
  ApiVersion: string;
}

/**
 * CCaaS_InitiateReroute request message
 *
 * Web API Action: CCaaS_InitiateReroute
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateRerouteRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateRerouteResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateRerouteRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_InitiateRerouteRequestParameters
  ) {
    super("CCaaS_InitiateReroute", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateReroute`;

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

  parseResponse(_response: Response): Promise<CCaaS_InitiateRerouteResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_InitiateRerouteResponse());
  }
}

/**
 * CCaaS_InitiateReroute response message
 */
export class CCaaS_InitiateRerouteResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateReroute");
  }

  static fromResponse(_data?: unknown): CCaaS_InitiateRerouteResponse {
    return new CCaaS_InitiateRerouteResponse();
  }
}
