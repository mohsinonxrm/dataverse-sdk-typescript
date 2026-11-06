import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_EndSecondaryChannel request message
 *
 * Web API Action: CCaaS_EndSecondaryChannel
 */
export class CCaaS_EndSecondaryChannelRequest
  extends OrganizationRequest
  implements Executable<CCaaS_EndSecondaryChannelResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public secondaryChannelSessionId: string,
    public apiVersion: string,
    public secondaryChannelType: string
  ) {
    super("CCaaS_EndSecondaryChannel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_EndSecondaryChannel`;

    const body: Record<string, unknown> = {
      SecondaryChannelSessionId: this.secondaryChannelSessionId,
      ApiVersion: this.apiVersion,
      SecondaryChannelType: this.secondaryChannelType,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_EndSecondaryChannelResponse> {
    // No return value (204 No Content)
    return new CCaaS_EndSecondaryChannelResponse();
  }
}

/**
 * CCaaS_EndSecondaryChannel response message
 */
export class CCaaS_EndSecondaryChannelResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_EndSecondaryChannel");
  }

  static fromResponse(_data: unknown): CCaaS_EndSecondaryChannelResponse {
    return new CCaaS_EndSecondaryChannelResponse();
  }
}
