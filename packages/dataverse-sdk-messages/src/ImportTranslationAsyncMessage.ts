import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ImportTranslationAsyncResponse as ImportTranslationAsyncResponseData } from "./types/index.js";

/**
 * Parameters of the ImportTranslationAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportTranslationAsyncRequestParameters {
  TranslationFile: string;
  ImportJobId: string;
}

/**
 * ImportTranslationAsync request message
 *
 * Web API Action: ImportTranslationAsync
 */
export class ImportTranslationAsyncRequest
  extends OrganizationRequest
  implements Executable<ImportTranslationAsyncResponse>
{
  declare readonly Parameters: Readonly<ImportTranslationAsyncRequestParameters>;

  constructor(parameters: ImportTranslationAsyncRequestParameters) {
    super("ImportTranslationAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportTranslationAsync`;

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

  async parseResponse(response: Response): Promise<ImportTranslationAsyncResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return ImportTranslationAsyncResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * ImportTranslationAsync response message
 */
export class ImportTranslationAsyncResponse extends OrganizationResponse {
  constructor(public result: ImportTranslationAsyncResponseData) {
    super("ImportTranslationAsync");
  }

  static fromResponse(data: unknown): ImportTranslationAsyncResponse {
    return new ImportTranslationAsyncResponse(
      responseObject<ImportTranslationAsyncResponseData>(data)
    );
  }
}
