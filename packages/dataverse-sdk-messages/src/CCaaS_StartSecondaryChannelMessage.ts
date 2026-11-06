import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_StartSecondaryChannel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_StartSecondaryChannelRequestParameters {
  ApiVersion: string;
  SecondaryChannelType: string;
}

/**
 * CCaaS_StartSecondaryChannel request message
 *
 * Web API Action: CCaaS_StartSecondaryChannel
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_StartSecondaryChannelRequest
  extends OrganizationRequest
  implements Executable<CCaaS_StartSecondaryChannelResponse>
{
  declare readonly Parameters: Readonly<CCaaS_StartSecondaryChannelRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_StartSecondaryChannelRequestParameters
  ) {
    super("CCaaS_StartSecondaryChannel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_StartSecondaryChannel`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      SecondaryChannelType: this.Parameters.SecondaryChannelType,
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

  async parseResponse(response: Response): Promise<CCaaS_StartSecondaryChannelResponse> {
    // No return value (204 No Content)
    return new CCaaS_StartSecondaryChannelResponse();
  }
}

/**
 * CCaaS_StartSecondaryChannel response message
 */
export class CCaaS_StartSecondaryChannelResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_StartSecondaryChannel");
  }

  static fromResponse(_data: unknown): CCaaS_StartSecondaryChannelResponse {
    return new CCaaS_StartSecondaryChannelResponse();
  }
}
