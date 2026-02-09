import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_RaiseSecondaryChannelEvent action
 */
export interface CCaaS_RaiseSecondaryChannelEventResponse {
  // No content returned
}

/**
 * CCaaS_RaiseSecondaryChannelEvent action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_RaiseSecondaryChannelEventAction implements Executable<CCaaS_RaiseSecondaryChannelEventResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly secondaryChannelEventType: string,
    public readonly secondaryChannelSessionId: string,
    public readonly apiVersion: string,
    public readonly secondaryChannelType: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_RaiseSecondaryChannelEventResponse> {
    // No return value (204 No Content)
    return {};
  }
}
