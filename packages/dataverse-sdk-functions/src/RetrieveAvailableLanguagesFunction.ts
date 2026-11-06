import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveAvailableLanguages function
 */
export interface RetrieveAvailableLanguagesResponse {
  LocaleIds: number[];
}

/**
 * RetrieveAvailableLanguages function
 *
 * Unbound function
 */
export class RetrieveAvailableLanguagesFunction implements Executable<RetrieveAvailableLanguagesResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAvailableLanguages`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveAvailableLanguagesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveAvailableLanguagesResponse;
    return (await response.json()) as RetrieveAvailableLanguagesResponse;
  }
}
