import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CommitFileBlocksUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CommitFileBlocksUploadResponse {
  "@odata.context"?: string;
  FileId: string;
  FileSizeInBytes: number;
}

/**
 * Parameters of the CommitFileBlocksUpload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CommitFileBlocksUploadActionParameters {
  FileName: string;
  MimeType: string;
  BlockList: string[];
  FileContinuationToken: string;
}

/**
 * CommitFileBlocksUpload action
 *
 * Unbound action
 */
export class CommitFileBlocksUploadAction implements Executable<CommitFileBlocksUploadResponse> {
  constructor(public readonly parameters: CommitFileBlocksUploadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitFileBlocksUpload`;

    const body = requestBody({
      FileName: this.parameters.FileName,
      MimeType: this.parameters.MimeType,
      BlockList: this.parameters.BlockList,
      FileContinuationToken: this.parameters.FileContinuationToken,
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
    return (await response.json()) as CommitFileBlocksUploadResponse;
  }
}
