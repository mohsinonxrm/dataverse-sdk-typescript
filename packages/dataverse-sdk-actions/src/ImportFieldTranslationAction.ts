import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { importjob } from "./types/index.js";

/**
 * Response from ImportFieldTranslation action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface ImportFieldTranslationResponse extends importjob {
  "@odata.context"?: string;
  "@odata.etag"?: string;
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ImportFieldTranslationResponse> {
    const data = await response.json();
    return data as ImportFieldTranslationResponse;
  }
}
