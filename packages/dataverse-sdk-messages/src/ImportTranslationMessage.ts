import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ImportTranslation request message
 *
 * Web API Action: ImportTranslation
 */
export class ImportTranslationRequest
  extends OrganizationRequest
  implements Executable<ImportTranslationResponse>
{
  constructor(
    public translationFile: string,
    public importJobId: string
  ) {
    super("ImportTranslation");
  }

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
    return new ImportTranslationResponse();
  }
}

/**
 * ImportTranslation response message
 */
export class ImportTranslationResponse extends OrganizationResponse {
  constructor() {
    super("ImportTranslation");
  }

  static fromResponse(_data: unknown): ImportTranslationResponse {
    return new ImportTranslationResponse();
  }
}
