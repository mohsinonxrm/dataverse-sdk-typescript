import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RetrieveDeploymentLicenseType function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveDeploymentLicenseTypeResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveDeploymentLicenseTypeResponse;
  }
}
