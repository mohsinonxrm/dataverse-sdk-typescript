import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the ImportTranslation action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ImportTranslationResponse = void;

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

  parseResponse(_response: Response): Promise<ImportTranslationResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
