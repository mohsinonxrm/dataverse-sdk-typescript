import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ImportTranslationAsync action
 */
export interface ImportTranslationAsyncResponse {
  AsyncOperationId: string;
}

/**
 * ImportTranslationAsync action
 *
 * Unbound action
 */
export class ImportTranslationAsyncAction implements Executable<ImportTranslationAsyncResponse> {
  constructor(
    public readonly translationFile: string,
    public readonly importJobId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportTranslationAsync`;

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

  async parseResponse(response: Response): Promise<ImportTranslationAsyncResponse> {
    const data = await response.json();
    return data as ImportTranslationAsyncResponse;
  }
}
