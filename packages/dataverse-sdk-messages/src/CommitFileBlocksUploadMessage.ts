import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CommitFileBlocksUploadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CommitFileBlocksUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CommitFileBlocksUploadResult {
  "@odata.context"?: string;
  FileId: string;
  FileSizeInBytes: number;
}

/**
 * CommitFileBlocksUpload response message
 *
 * `result` is the value the CommitFileBlocksUpload action returns (see {@link CommitFileBlocksUploadResult}).
 */
export class CommitFileBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: CommitFileBlocksUploadResult) {
    super("CommitFileBlocksUpload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CommitFileBlocksUploadResponse {
    return new CommitFileBlocksUploadResponse(data as CommitFileBlocksUploadResult);
  }
}
