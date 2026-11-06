import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
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
 * Parameters of the ImportFieldTranslation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportFieldTranslationActionParameters {
  TranslationFile: string;
}

/**
 * ImportFieldTranslation action
 *
 * Unbound action
 */
export class ImportFieldTranslationAction implements Executable<ImportFieldTranslationResponse> {
  constructor(public readonly parameters: ImportFieldTranslationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportFieldTranslation`;

    const body = requestBody({
      TranslationFile: this.parameters.TranslationFile,
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

  async parseResponse(response: Response): Promise<ImportFieldTranslationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ImportFieldTranslationResponse;
    return (await response.json()) as ImportFieldTranslationResponse;
  }
}
