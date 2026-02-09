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
    const data = await response.json();
    return data as RetrieveInstalledLanguagePacksResponse;
  }
}
