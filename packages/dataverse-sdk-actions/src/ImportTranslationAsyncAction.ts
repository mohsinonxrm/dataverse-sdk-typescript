import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ImportTranslationAsync action
 */
export interface ImportTranslationAsyncResponse {
  AsyncOperationId: string;
}

/**
 * Parameters of the ImportTranslationAsync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportTranslationAsyncActionParameters {
  TranslationFile: string;
  ImportJobId: string;
}

/**
 * ImportTranslationAsync action
 *
 * Unbound action
 */
export class ImportTranslationAsyncAction implements Executable<ImportTranslationAsyncResponse> {
  constructor(public readonly parameters: ImportTranslationAsyncActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportTranslationAsync`;

    const body = requestBody({
      TranslationFile: this.parameters.TranslationFile,
      ImportJobId: this.parameters.ImportJobId,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ImportTranslationAsyncResponse;
    return (await response.json()) as ImportTranslationAsyncResponse;
  }
}
