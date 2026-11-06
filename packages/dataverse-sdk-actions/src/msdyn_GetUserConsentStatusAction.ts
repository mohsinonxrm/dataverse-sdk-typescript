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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetUserConsentStatusResponse;
    return (await response.json()) as msdyn_GetUserConsentStatusResponse;
  }
}
