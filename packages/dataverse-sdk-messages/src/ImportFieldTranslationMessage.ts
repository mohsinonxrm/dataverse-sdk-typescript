import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { importjob } from "./types/index.js";

/**
 * ImportFieldTranslation request message
 *
 * Web API Action: ImportFieldTranslation
 */
export class ImportFieldTranslationRequest
  extends OrganizationRequest
  implements Executable<ImportFieldTranslationResponse>
{
  constructor(public translationFile: string) {
    super("ImportFieldTranslation");
  }

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
    return ImportFieldTranslationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      TranslationFile: this.translationFile,
    };
  }
}

/**
 * ImportFieldTranslation response message
 */
export class ImportFieldTranslationResponse extends OrganizationResponse {
  constructor(public result: importjob) {
    super("ImportFieldTranslation");
  }

  static fromResponse(data: unknown): ImportFieldTranslationResponse {
    return new ImportFieldTranslationResponse((data as any).value);
  }
}
