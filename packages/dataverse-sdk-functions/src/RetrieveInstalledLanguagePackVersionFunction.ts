import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from RetrieveInstalledLanguagePackVersion function
 */
export interface RetrieveInstalledLanguagePackVersionResponse {
  Version: string;
}

/**
 * RetrieveInstalledLanguagePackVersion function
 *
 * Unbound function
 */
export class RetrieveInstalledLanguagePackVersionFunction implements Executable<RetrieveInstalledLanguagePackVersionResponse> {
  constructor(public readonly language: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveInstalledLanguagePackVersion`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.language !== undefined) {
      aliases.push(`Language=@p1`);
      params.append("@p1", formatAliasValue(this.language));
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

  async parseResponse(response: Response): Promise<RetrieveInstalledLanguagePackVersionResponse> {
    const data = await response.json();
    return data as RetrieveInstalledLanguagePackVersionResponse;
  }
}
