import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ImportTranslation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportTranslationRequestParameters {
  TranslationFile: string;
  ImportJobId: string;
}

/**
 * ImportTranslation request message
 *
 * Web API Action: ImportTranslation
 */
export class ImportTranslationRequest
  extends OrganizationRequest
  implements Executable<ImportTranslationResponse>
{
  declare readonly Parameters: Readonly<ImportTranslationRequestParameters>;

  constructor(parameters: ImportTranslationRequestParameters) {
    super("ImportTranslation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportTranslation`;

    const body = requestBody({
      TranslationFile: this.Parameters.TranslationFile,
      ImportJobId: this.Parameters.ImportJobId,
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
    // No return value (204 No Content)
    return Promise.resolve(new ImportTranslationResponse());
  }
}

/**
 * ImportTranslation response message
 */
export class ImportTranslationResponse extends OrganizationResponse {
  constructor() {
    super("ImportTranslation");
  }

  static fromResponse(_data?: unknown): ImportTranslationResponse {
    return new ImportTranslationResponse();
  }
}
