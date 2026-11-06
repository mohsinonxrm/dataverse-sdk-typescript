import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the ExportFieldTranslation function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExportFieldTranslationResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ExportFieldTranslationResponse;
  }
}
