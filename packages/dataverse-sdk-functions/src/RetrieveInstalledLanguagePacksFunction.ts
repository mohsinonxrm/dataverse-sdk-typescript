import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RetrieveInstalledLanguagePacks function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveInstalledLanguagePacksResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveInstalledLanguagePacksResponse;
  }
}
