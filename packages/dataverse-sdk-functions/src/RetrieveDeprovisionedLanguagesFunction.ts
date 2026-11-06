import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveDeprovisionedLanguages function
 */
export interface RetrieveDeprovisionedLanguagesResponse {
  RetrieveDeprovisionedLanguages: number[];
}

/**
 * RetrieveDeprovisionedLanguages function
 *
 * Unbound function
 */
export class RetrieveDeprovisionedLanguagesFunction implements Executable<RetrieveDeprovisionedLanguagesResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDeprovisionedLanguages`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveDeprovisionedLanguagesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveDeprovisionedLanguagesResponse;
  }
}
