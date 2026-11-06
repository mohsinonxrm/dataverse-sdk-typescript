import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ImportTranslation action
 */
export interface ImportTranslationResponse {
  // No content returned
}

/**
 * Parameters of the ImportTranslation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportTranslationActionParameters {
  TranslationFile: string;
  ImportJobId: string;
}

/**
 * ImportTranslation action
 *
 * Unbound action
 */
export class ImportTranslationAction implements Executable<ImportTranslationResponse> {
  constructor(public readonly parameters: ImportTranslationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportTranslation`;

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

  async parseResponse(response: Response): Promise<ImportTranslationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ImportTranslationResponse;
    return (await response.json()) as ImportTranslationResponse;
  }
}
