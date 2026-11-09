import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the InitializeTemporaryFileBlocksUpload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeTemporaryFileBlocksUploadRequestParameters {
  FileName: string;
  FileSize: number;
}

/**
 * InitializeTemporaryFileBlocksUpload request message
 *
 * Web API Action: InitializeTemporaryFileBlocksUpload
 */
export class InitializeTemporaryFileBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<InitializeTemporaryFileBlocksUploadResponse>
{
  declare readonly Parameters: Readonly<InitializeTemporaryFileBlocksUploadRequestParameters>;

  constructor(parameters: InitializeTemporaryFileBlocksUploadRequestParameters) {
    super("InitializeTemporaryFileBlocksUpload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeTemporaryFileBlocksUpload`;

    const body = requestBody({
      FileName: this.Parameters.FileName,
      FileSize: this.Parameters.FileSize,
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

  async parseResponse(response: Response): Promise<InitializeTemporaryFileBlocksUploadResponse> {
    // The body is the complex value, with its @odata.context
    return InitializeTemporaryFileBlocksUploadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InitializeTemporaryFileBlocksUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InitializeTemporaryFileBlocksUploadResult {
  "@odata.context"?: string;
  FileContinuationToken: string;
  RecordId: string;
}

/**
 * InitializeTemporaryFileBlocksUpload response message
 *
 * `result` is the value the InitializeTemporaryFileBlocksUpload action returns (see {@link InitializeTemporaryFileBlocksUploadResult}).
 */
export class InitializeTemporaryFileBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: InitializeTemporaryFileBlocksUploadResult) {
    super("InitializeTemporaryFileBlocksUpload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InitializeTemporaryFileBlocksUploadResponse {
    return new InitializeTemporaryFileBlocksUploadResponse(
      data as InitializeTemporaryFileBlocksUploadResult
    );
  }
}
