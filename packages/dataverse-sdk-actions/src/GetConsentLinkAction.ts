import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetConsentLink action
 */
export interface GetConsentLinkResponse {
  principalId: string;
  customParameters: string;
  redirectUrl: string;
  firstPartyLoginUri: string;
  consentLink: string;
  tenantId: string;
  principalType: string;
  parameterConsentLinks: string;
}

/**
 * GetConsentLink action
 *
 * Bound action
 * Binding parameter: entity (mscrm.connectioninstance)
 */
export class GetConsentLinkAction implements Executable<GetConsentLinkResponse> {
  constructor(
    public readonly connectioninstanceId: string,
    public readonly redirectUrl: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/connectioninstances(${this.connectioninstanceId})/Microsoft.Dynamics.CRM.GetConsentLink`;

    const body: Record<string, unknown> = {
      redirectUrl: this.redirectUrl,
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

  async parseResponse(response: Response): Promise<GetConsentLinkResponse> {
    const data = await response.json();
    return data as GetConsentLinkResponse;
  }
}
