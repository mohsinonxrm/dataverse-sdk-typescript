import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_EndSecondaryChannel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_EndSecondaryChannelRequestParameters {
  ApiVersion: string;
  SecondaryChannelType: string;
  SecondaryChannelSessionId: string;
}

/**
 * CCaaS_EndSecondaryChannel request message
 *
 * Web API Action: CCaaS_EndSecondaryChannel
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_EndSecondaryChannelRequest
  extends OrganizationRequest
  implements Executable<CCaaS_EndSecondaryChannelResponse>
{
  declare readonly Parameters: Readonly<CCaaS_EndSecondaryChannelRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_EndSecondaryChannelRequestParameters
  ) {
    super("CCaaS_EndSecondaryChannel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_EndSecondaryChannel`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      SecondaryChannelType: this.Parameters.SecondaryChannelType,
      SecondaryChannelSessionId: this.Parameters.SecondaryChannelSessionId,
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

  parseResponse(_response: Response): Promise<CCaaS_EndSecondaryChannelResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_EndSecondaryChannelResponse());
  }
}

/**
 * CCaaS_EndSecondaryChannel response message
 */
export class CCaaS_EndSecondaryChannelResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_EndSecondaryChannel");
  }

  static fromResponse(_data?: unknown): CCaaS_EndSecondaryChannelResponse {
    return new CCaaS_EndSecondaryChannelResponse();
  }
}
