import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return ImportTranslationAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ImportTranslationAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ImportTranslationAsyncResult {
  "@odata.context"?: string;
  AsyncOperationId: string;
}

/**
 * ImportTranslationAsync response message
 *
 * `result` is the value the ImportTranslationAsync action returns (see {@link ImportTranslationAsyncResult}).
 */
export class ImportTranslationAsyncResponse extends OrganizationResponse {
  constructor(public result: ImportTranslationAsyncResult) {
    super("ImportTranslationAsync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ImportTranslationAsyncResponse {
    return new ImportTranslationAsyncResponse(data as ImportTranslationAsyncResult);
  }
}
