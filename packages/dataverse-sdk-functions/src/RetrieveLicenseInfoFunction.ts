import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from RetrieveLicenseInfo function
 */
export interface RetrieveLicenseInfoResponse {
  AvailableCount: number;
  GrantedLicenseCount: number;
}

/**
 * RetrieveLicenseInfo function
 *
 * Unbound function
 */
export class RetrieveLicenseInfoFunction implements Executable<RetrieveLicenseInfoResponse> {
  constructor(public readonly accessMode: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveLicenseInfo`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.accessMode !== undefined) {
      aliases.push(`AccessMode=@p1`);
      params.append("@p1", formatAliasValue(this.accessMode));
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
    const data = await response.json();
    return data as RetrieveLicenseInfoResponse;
  }
}
