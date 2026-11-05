import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ImportTranslation action
 */
export interface ImportTranslationResponse {
  // No content returned
}

/**
 * ImportTranslation action
 *
 * Unbound action
 */
export class ImportTranslationAction implements Executable<ImportTranslationResponse> {
  constructor(
    public readonly translationFile: string,
    public readonly importJobId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportTranslation`;

    const body: Record<string, unknown> = {
      TranslationFile: this.translationFile,
      ImportJobId: this.importJobId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ImportTranslationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
