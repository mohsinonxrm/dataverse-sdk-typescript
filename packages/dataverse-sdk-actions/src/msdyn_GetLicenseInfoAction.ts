import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetLicenseInfo action
 */
export interface msdyn_GetLicenseInfoResponse {
  Response: string;
}

/**
 * msdyn_GetLicenseInfo action
 *
 * Unbound action
 */
export class msdyn_GetLicenseInfoAction implements Executable<msdyn_GetLicenseInfoResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLicenseInfo`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetLicenseInfoResponse> {
    const data = await response.json();
    return data as msdyn_GetLicenseInfoResponse;
  }
}
