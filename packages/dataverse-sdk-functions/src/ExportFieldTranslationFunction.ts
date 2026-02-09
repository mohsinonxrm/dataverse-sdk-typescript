import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ExportFieldTranslation function
 */
export interface ExportFieldTranslationResponse {
  ExportTranslationFile: string;
}

/**
 * ExportFieldTranslation function
 *
 * Unbound function
 */
export class ExportFieldTranslationFunction implements Executable<ExportFieldTranslationResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ExportFieldTranslation`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ExportFieldTranslationResponse> {
    const data = await response.json();
    return data as ExportFieldTranslationResponse;
  }
}
