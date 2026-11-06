import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_RaiseSecondaryChannelEvent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_RaiseSecondaryChannelEventRequestParameters {
  ApiVersion: string;
  SecondaryChannelEventType: string;
  SecondaryChannelSessionId: string;
  SecondaryChannelType: string;
}

/**
 * CCaaS_RaiseSecondaryChannelEvent request message
 *
 * Web API Action: CCaaS_RaiseSecondaryChannelEvent
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_RaiseSecondaryChannelEventRequest
  extends OrganizationRequest
  implements Executable<CCaaS_RaiseSecondaryChannelEventResponse>
{
  declare readonly Parameters: Readonly<CCaaS_RaiseSecondaryChannelEventRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_RaiseSecondaryChannelEventRequestParameters
  ) {
    super("CCaaS_RaiseSecondaryChannelEvent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_RaiseSecondaryChannelEvent`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      SecondaryChannelEventType: this.Parameters.SecondaryChannelEventType,
      SecondaryChannelSessionId: this.Parameters.SecondaryChannelSessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_RaiseSecondaryChannelEventResponse> {
    // No return value (204 No Content)
    return new CCaaS_RaiseSecondaryChannelEventResponse();
  }
}

/**
 * CCaaS_RaiseSecondaryChannelEvent response message
 */
export class CCaaS_RaiseSecondaryChannelEventResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_RaiseSecondaryChannelEvent");
  }

  static fromResponse(_data: unknown): CCaaS_RaiseSecondaryChannelEventResponse {
    return new CCaaS_RaiseSecondaryChannelEventResponse();
  }
}
