import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveProvisionedLanguages function
 */
export interface RetrieveProvisionedLanguagesResponse {
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
    const data = await response.json();
    return data as RetrieveProvisionedLanguagesResponse;
  }
}
