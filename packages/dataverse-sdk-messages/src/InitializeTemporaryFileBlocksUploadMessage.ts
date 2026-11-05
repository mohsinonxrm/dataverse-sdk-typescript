import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { InitializeTemporaryFileBlocksUploadResponse as InitializeTemporaryFileBlocksUploadResponseData } from "./types/index.js";

/**
 * InitializeTemporaryFileBlocksUpload request message
 *
 * Web API Action: InitializeTemporaryFileBlocksUpload
 */
export class InitializeTemporaryFileBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<InitializeTemporaryFileBlocksUploadResponse>
{
  constructor(
    public fileName: string,
    public fileSize: number
  ) {
    super("InitializeTemporaryFileBlocksUpload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeTemporaryFileBlocksUpload`;

    const body: Record<string, unknown> = {
      FileName: this.fileName,
      FileSize: this.fileSize,
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

  async parseResponse(response: Response): Promise<InitializeTemporaryFileBlocksUploadResponse> {
    const data = await response.json();
    return InitializeTemporaryFileBlocksUploadResponse.fromResponse(data);
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
