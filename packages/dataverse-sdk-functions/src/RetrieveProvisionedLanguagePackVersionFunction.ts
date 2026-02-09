import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveProvisionedLanguagePackVersion function
 */
export interface RetrieveProvisionedLanguagePackVersionResponse {
  Version: string;
}

/**
 * RetrieveProvisionedLanguagePackVersion function
 *
 * Unbound function
 */
export class RetrieveProvisionedLanguagePackVersionFunction implements Executable<RetrieveProvisionedLanguagePackVersionResponse> {
  constructor(public readonly language: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveProvisionedLanguagePackVersion`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.language !== undefined) {
      aliases.push(`Language=@p1`);
      params.append(
        "@p1",
        typeof this.language === "string" ? `'${this.language}'` : String(this.language)
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

  async parseResponse(response: Response): Promise<RetrieveProvisionedLanguagePackVersionResponse> {
    const data = await response.json();
    return data as RetrieveProvisionedLanguagePackVersionResponse;
  }
}
