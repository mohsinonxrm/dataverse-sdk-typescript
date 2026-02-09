import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_StartSecondaryChannel request message
 *
 * Web API Action: CCaaS_StartSecondaryChannel
 */
export class CCaaS_StartSecondaryChannelRequest
  extends OrganizationRequest
  implements Executable<CCaaS_StartSecondaryChannelResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string,
    public secondaryChannelType: string
  ) {
    super("CCaaS_StartSecondaryChannel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_StartSecondaryChannel`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      SecondaryChannelType: this.secondaryChannelType,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_StartSecondaryChannelResponse> {
    // No return value (204 No Content)
    return new CCaaS_StartSecondaryChannelResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      ApiVersion: this.apiVersion,
      SecondaryChannelType: this.secondaryChannelType,
    };
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
