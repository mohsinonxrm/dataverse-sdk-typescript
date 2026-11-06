import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveInstalledLanguagePacks function
 */
export interface RetrieveInstalledLanguagePacksResponse {
  RetrieveInstalledLanguagePacks: number[];
}

/**
 * RetrieveInstalledLanguagePacks function
 *
 * Unbound function
 */
export class RetrieveInstalledLanguagePacksFunction implements Executable<RetrieveInstalledLanguagePacksResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveInstalledLanguagePacks`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveInstalledLanguagePacksResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveInstalledLanguagePacksResponse;
    return (await response.json()) as RetrieveInstalledLanguagePacksResponse;
  }
}
