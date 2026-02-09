import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveUserApplicationLicenseAccess function
 */
export interface RetrieveUserApplicationLicenseAccessResponse {
  LicenseAccessInfo: string;
}

/**
 * RetrieveUserApplicationLicenseAccess function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 */
export class RetrieveUserApplicationLicenseAccessFunction implements Executable<RetrieveUserApplicationLicenseAccessResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly applicationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrieveUserApplicationLicenseAccess`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.applicationId !== undefined) {
      aliases.push(`ApplicationId=@p1`);
      params.append(
        "@p1",
        typeof this.applicationId === "string"
          ? `'${this.applicationId}'`
          : String(this.applicationId)
      );
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUserApplicationLicenseAccessResponse> {
    const data = await response.json();
    return data as RetrieveUserApplicationLicenseAccessResponse;
  }
}
