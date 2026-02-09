import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_StartSecondaryChannel action
 */
export interface CCaaS_StartSecondaryChannelResponse {
  // No content returned
}

/**
 * CCaaS_StartSecondaryChannel action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_StartSecondaryChannelAction implements Executable<CCaaS_StartSecondaryChannelResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly apiVersion: string,
    public readonly secondaryChannelType: string
  ) {}

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
    return {};
  }
}
