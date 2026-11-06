import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RetrieveProvisionedLanguages function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveProvisionedLanguagesResponse {
  "@odata.context"?: string;
  RetrieveProvisionedLanguages: number[];
}

/**
 * RetrieveProvisionedLanguages function
 *
 * Unbound function
 */
export class RetrieveProvisionedLanguagesFunction implements Executable<RetrieveProvisionedLanguagesResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveProvisionedLanguages`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveProvisionedLanguagesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveProvisionedLanguagesResponse;
  }
}
