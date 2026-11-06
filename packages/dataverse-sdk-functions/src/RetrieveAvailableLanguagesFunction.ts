import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RetrieveAvailableLanguages function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAvailableLanguagesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveAvailableLanguagesResponse;
  }
}
