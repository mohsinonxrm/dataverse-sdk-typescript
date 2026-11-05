import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetUserConsentStatus action
 */
export interface msdyn_GetUserConsentStatusResponse {
  status: string;
}

/**
 * msdyn_GetUserConsentStatus action
 *
 * Unbound action
 */
export class msdyn_GetUserConsentStatusAction implements Executable<msdyn_GetUserConsentStatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetUserConsentStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetUserConsentStatusResponse> {
    const data = await response.json();
    return data as msdyn_GetUserConsentStatusResponse;
  }
}
