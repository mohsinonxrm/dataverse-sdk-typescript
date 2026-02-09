import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetFeatureConsentStatus action
 */
export interface msdyn_GetFeatureConsentStatusResponse {
  // No content returned
}

/**
 * msdyn_GetFeatureConsentStatus action
 *
 * Unbound action
 */
export class msdyn_GetFeatureConsentStatusAction implements Executable<msdyn_GetFeatureConsentStatusResponse> {
  constructor(public readonly payload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFeatureConsentStatus`;

    const body: Record<string, unknown> = {
      payload: this.payload,
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

  async parseResponse(response: Response): Promise<msdyn_GetFeatureConsentStatusResponse> {
    // No return value (204 No Content)
    return {};
  }
}
