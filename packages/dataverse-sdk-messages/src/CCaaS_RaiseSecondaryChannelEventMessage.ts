import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_RaiseSecondaryChannelEvent request message
 *
 * Web API Action: CCaaS_RaiseSecondaryChannelEvent
 */
export class CCaaS_RaiseSecondaryChannelEventRequest
  extends OrganizationRequest
  implements Executable<CCaaS_RaiseSecondaryChannelEventResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public secondaryChannelEventType: string,
    public secondaryChannelSessionId: string,
    public apiVersion: string,
    public secondaryChannelType: string
  ) {
    super("CCaaS_RaiseSecondaryChannelEvent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_RaiseSecondaryChannelEvent`;

    const body: Record<string, unknown> = {
      SecondaryChannelEventType: this.secondaryChannelEventType,
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

  async parseResponse(response: Response): Promise<CCaaS_RaiseSecondaryChannelEventResponse> {
    // No return value (204 No Content)
    return new CCaaS_RaiseSecondaryChannelEventResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      SecondaryChannelEventType: this.secondaryChannelEventType,
      SecondaryChannelSessionId: this.secondaryChannelSessionId,
      ApiVersion: this.apiVersion,
      SecondaryChannelType: this.secondaryChannelType,
    };
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
