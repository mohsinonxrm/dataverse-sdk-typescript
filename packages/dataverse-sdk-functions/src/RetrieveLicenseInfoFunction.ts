import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from RetrieveLicenseInfo function
 */
export interface RetrieveLicenseInfoResponse {
  AvailableCount: number;
  GrantedLicenseCount: number;
}

/**
 * Parameters of the RetrieveLicenseInfo function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveLicenseInfoFunctionParameters {
  AccessMode: number;
}

/**
 * RetrieveLicenseInfo function
 *
 * Unbound function
 */
export class RetrieveLicenseInfoFunction implements Executable<RetrieveLicenseInfoResponse> {
  constructor(public readonly parameters: RetrieveLicenseInfoFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveLicenseInfo`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.AccessMode !== undefined) {
      aliases.push(`AccessMode=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.AccessMode, "Edm.Int32"));
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

  async parseResponse(response: Response): Promise<RetrieveLicenseInfoResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveLicenseInfoResponse;
    return (await response.json()) as RetrieveLicenseInfoResponse;
  }
}
