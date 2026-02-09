import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetSearchInformation function
 */
export interface GetSearchInformationResponse {
  CanAllowLeadingWildCardSearch: string;
  CanSupportedByRelevanceSearch: string;
}

/**
 * GetSearchInformation function
 *
 * Unbound function
 */
export class GetSearchInformationFunction implements Executable<GetSearchInformationResponse> {
  constructor(public readonly fetchxml: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetSearchInformation`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.fetchxml !== undefined) {
      aliases.push(`Fetchxml=@p1`);
      params.append(
        "@p1",
        typeof this.fetchxml === "string" ? `'${this.fetchxml}'` : String(this.fetchxml)
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

  async parseResponse(response: Response): Promise<GetSearchInformationResponse> {
    const data = await response.json();
    return data as GetSearchInformationResponse;
  }
}
