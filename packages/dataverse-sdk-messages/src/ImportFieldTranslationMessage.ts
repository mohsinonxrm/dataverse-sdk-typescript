import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { importjob } from "./types/index.js";

/**
 * Parameters of the ImportFieldTranslation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportFieldTranslationRequestParameters {
  TranslationFile: string;
}

/**
 * ImportFieldTranslation request message
 *
 * Web API Action: ImportFieldTranslation
 */
export class ImportFieldTranslationRequest
  extends OrganizationRequest
  implements Executable<ImportFieldTranslationResponse>
{
  declare readonly Parameters: Readonly<ImportFieldTranslationRequestParameters>;

  constructor(parameters: ImportFieldTranslationRequestParameters) {
    super("ImportFieldTranslation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportFieldTranslation`;

    const body = requestBody({
      TranslationFile: this.Parameters.TranslationFile,
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
    if (response.status === 204) return ImportFieldTranslationResponse.fromResponse({});
    return ImportFieldTranslationResponse.fromResponse(await response.json());
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
    return new ImportFieldTranslationResponse(responseObject<importjob>(data));
  }
}
