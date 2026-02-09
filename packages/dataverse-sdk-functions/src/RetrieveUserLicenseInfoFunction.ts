import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { UserLicenseInfo } from "./types/index.js";

/**
 * Response from RetrieveUserLicenseInfo function
 */
export interface RetrieveUserLicenseInfoResponse {
  licenseInfo: UserLicenseInfo;
}

/**
 * RetrieveUserLicenseInfo function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 */
export class RetrieveUserLicenseInfoFunction implements Executable<RetrieveUserLicenseInfoResponse> {
  constructor(public readonly systemuserId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserLicenseInfo`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUserLicenseInfoResponse> {
    const data = await response.json();
    return data as RetrieveUserLicenseInfoResponse;
  }
}
