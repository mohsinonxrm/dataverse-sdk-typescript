import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CommitFileBlocksUpload action
 */
export interface CommitFileBlocksUploadResponse {
  FileId: string;
  FileSizeInBytes: number;
}

/**
 * CommitFileBlocksUpload action
 *
 * Unbound action
 */
export class CommitFileBlocksUploadAction implements Executable<CommitFileBlocksUploadResponse> {
  constructor(
    public readonly fileName: string,
    public readonly mimeType: string,
    public readonly blockList: string[],
    public readonly fileContinuationToken: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CommitFileBlocksUploadResponse> {
    const data = await response.json();
    return data as CommitFileBlocksUploadResponse;
  }
}
