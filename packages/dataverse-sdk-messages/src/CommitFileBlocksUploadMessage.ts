import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CommitFileBlocksUploadResponse as CommitFileBlocksUploadResponseData } from "./types/index.js";

/**
 * CommitFileBlocksUpload request message
 *
 * Web API Action: CommitFileBlocksUpload
 */
export class CommitFileBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<CommitFileBlocksUploadResponse>
{
  constructor(
    public fileName: string,
    public mimeType: string,
    public blockList: string[],
    public fileContinuationToken: string
  ) {
    super("CommitFileBlocksUpload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitFileBlocksUpload`;

    const body: Record<string, unknown> = {
      FileName: this.fileName,
      MimeType: this.mimeType,
      BlockList: this.blockList,
      FileContinuationToken: this.fileContinuationToken,
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

  async parseResponse(response: Response): Promise<CommitFileBlocksUploadResponse> {
    const data = await response.json();
    return CommitFileBlocksUploadResponse.fromResponse(data);
  }
}

/**
 * CommitFileBlocksUpload response message
 */
export class CommitFileBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: CommitFileBlocksUploadResponseData) {
    super("CommitFileBlocksUpload");
  }

  static fromResponse(data: unknown): CommitFileBlocksUploadResponse {
    return new CommitFileBlocksUploadResponse(
      responseObject<CommitFileBlocksUploadResponseData>(data)
    );
  }
}
