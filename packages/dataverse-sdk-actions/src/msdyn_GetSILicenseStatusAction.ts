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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetSILicenseStatusResponse;
    return (await response.json()) as msdyn_GetSILicenseStatusResponse;
  }
}
