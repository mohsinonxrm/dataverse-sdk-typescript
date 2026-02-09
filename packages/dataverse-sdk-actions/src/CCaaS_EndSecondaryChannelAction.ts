import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_EndSecondaryChannel action
 */
export interface CCaaS_EndSecondaryChannelResponse {
  // No content returned
}

/**
 * CCaaS_EndSecondaryChannel action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_EndSecondaryChannelAction implements Executable<CCaaS_EndSecondaryChannelResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly secondaryChannelSessionId: string,
    public readonly apiVersion: string,
    public readonly secondaryChannelType: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_EndSecondaryChannelResponse> {
    // No return value (204 No Content)
    return {};
  }
}
