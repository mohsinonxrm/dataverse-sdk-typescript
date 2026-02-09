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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSILicenseStatusResponse> {
    const data = await response.json();
    return data as msdyn_GetSILicenseStatusResponse;
  }
}
