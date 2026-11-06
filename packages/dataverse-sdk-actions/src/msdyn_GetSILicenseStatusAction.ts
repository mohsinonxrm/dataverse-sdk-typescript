import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSILicenseStatus action
 */
export interface msdyn_GetSILicenseStatusResponse {
  SILicenseStatus: string;
}

/**
 * msdyn_GetSILicenseStatus action
 *
 * Unbound action
 */
export class msdyn_GetSILicenseStatusAction implements Executable<msdyn_GetSILicenseStatusResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSILicenseStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSILicenseStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetSILicenseStatusResponse;
  }
}
