import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { InitializeTemporaryFileBlocksUploadResponse as InitializeTemporaryFileBlocksUploadResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return InitializeTemporaryFileBlocksUploadResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * InitializeTemporaryFileBlocksUpload response message
 */
export class InitializeTemporaryFileBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: InitializeTemporaryFileBlocksUploadResponseData) {
    super("InitializeTemporaryFileBlocksUpload");
  }

  static fromResponse(data: unknown): InitializeTemporaryFileBlocksUploadResponse {
    return new InitializeTemporaryFileBlocksUploadResponse(
      responseObject<InitializeTemporaryFileBlocksUploadResponseData>(data)
    );
  }
}
