import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveDeploymentLicenseType function
 */
export interface RetrieveDeploymentLicenseTypeResponse {
  licenseType: string;
}

/**
 * RetrieveDeploymentLicenseType function
 *
 * Unbound function
 */
export class RetrieveDeploymentLicenseTypeFunction implements Executable<RetrieveDeploymentLicenseTypeResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDeploymentLicenseType`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveDeploymentLicenseTypeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveDeploymentLicenseTypeResponse;
    return (await response.json()) as RetrieveDeploymentLicenseTypeResponse;
  }
}
