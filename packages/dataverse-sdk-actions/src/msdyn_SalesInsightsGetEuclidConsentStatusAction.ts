import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesInsightsGetEuclidConsentStatus action
 */
export interface msdyn_SalesInsightsGetEuclidConsentStatusResponse {
  IsConsentProvided: boolean;
}

/**
 * msdyn_SalesInsightsGetEuclidConsentStatus action
 *
 * Unbound action
 */
export class msdyn_SalesInsightsGetEuclidConsentStatusAction implements Executable<msdyn_SalesInsightsGetEuclidConsentStatusResponse> {
  constructor(public readonly permissionLevel: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesInsightsGetEuclidConsentStatus`;

    const body: Record<string, unknown> = {
      PermissionLevel: this.permissionLevel,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesInsightsGetEuclidConsentStatusResponse> {
    const data = await response.json();
    return data as msdyn_SalesInsightsGetEuclidConsentStatusResponse;
  }
}
