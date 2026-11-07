import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RetrieveDeprovisionedLanguages function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveDeprovisionedLanguagesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveDeprovisionedLanguagesResponse;
  }
}
