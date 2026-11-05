import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ImportTranslationAsyncResponse as ImportTranslationAsyncResponseData } from "./types/index.js";

/**
 * ImportTranslationAsync request message
 *
 * Web API Action: ImportTranslationAsync
 */
export class ImportTranslationAsyncRequest
  extends OrganizationRequest
  implements Executable<ImportTranslationAsyncResponse>
{
  constructor(
    public translationFile: string,
    public importJobId: string
  ) {
    super("ImportTranslationAsync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportTranslationAsync`;

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

  async parseResponse(response: Response): Promise<ImportTranslationAsyncResponse> {
    const data = await response.json();
    return ImportTranslationAsyncResponse.fromResponse(data);
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
