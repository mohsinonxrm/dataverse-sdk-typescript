import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from CommitAttachmentBlocksUpload action
 */
export interface CommitAttachmentBlocksUploadResponse {
  FileSizeInBytes: number;
  ActivityMimeAttachmentId: string;
}

/**
 * CommitAttachmentBlocksUpload action
 *
 * Unbound action
 */
export class CommitAttachmentBlocksUploadAction implements Executable<CommitAttachmentBlocksUploadResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly blockList: string[],
    public readonly fileContinuationToken: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitAttachmentBlocksUpload`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<CommitAttachmentBlocksUploadResponse> {
    const data = await response.json();
    return data as CommitAttachmentBlocksUploadResponse;
  }
}
