import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ResetInheritedAccess function
 */
export interface ResetInheritedAccessResponse {
  ResetInheritedAccessResponse: string;
}

/**
 * ResetInheritedAccess function
 *
 * Unbound function
 */
export class ResetInheritedAccessFunction implements Executable<ResetInheritedAccessResponse> {
  constructor(public readonly fetchXml: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ResetInheritedAccess`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.fetchXml !== undefined) {
      aliases.push(`FetchXml=@p1`);
      params.append(
        "@p1",
        typeof this.fetchXml === "string" ? `'${this.fetchXml}'` : String(this.fetchXml)
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

  async parseResponse(response: Response): Promise<ResetInheritedAccessResponse> {
    const data = await response.json();
    return data as ResetInheritedAccessResponse;
  }
}
