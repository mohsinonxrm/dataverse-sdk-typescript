import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { importjob } from "./types/index.js";

/**
 * Response from ImportFieldTranslation action
 */
export interface ImportFieldTranslationResponse {
  value: importjob;
}

/**
 * ImportFieldTranslation action
 *
 * Unbound action
 */
export class ImportFieldTranslationAction implements Executable<ImportFieldTranslationResponse> {
  constructor(public readonly translationFile: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportFieldTranslation`;

    const body: Record<string, unknown> = {
      TranslationFile: this.translationFile,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ImportFieldTranslationResponse> {
    const data = await response.json();
    return data as ImportFieldTranslationResponse;
  }
}
