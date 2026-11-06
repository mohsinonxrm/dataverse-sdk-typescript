import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CommitFileBlocksUploadResponse as CommitFileBlocksUploadResponseData } from "./types/index.js";

/**
 * Parameters of the CommitFileBlocksUpload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CommitFileBlocksUploadRequestParameters {
  FileName: string;
  MimeType: string;
  BlockList: string[];
  FileContinuationToken: string;
}

/**
 * CommitFileBlocksUpload request message
 *
 * Web API Action: CommitFileBlocksUpload
 */
export class CommitFileBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<CommitFileBlocksUploadResponse>
{
  declare readonly Parameters: Readonly<CommitFileBlocksUploadRequestParameters>;

  constructor(parameters: CommitFileBlocksUploadRequestParameters) {
    super("CommitFileBlocksUpload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitFileBlocksUpload`;

    const body = requestBody({
      FileName: this.Parameters.FileName,
      MimeType: this.Parameters.MimeType,
      BlockList: this.Parameters.BlockList,
      FileContinuationToken: this.Parameters.FileContinuationToken,
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

  async parseResponse(response: Response): Promise<CommitFileBlocksUploadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CommitFileBlocksUploadResponse.fromResponse({});
    return CommitFileBlocksUploadResponse.fromResponse(await response.json());
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
