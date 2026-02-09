import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from CommitAnnotationBlocksUpload action
 */
export interface CommitAnnotationBlocksUploadResponse {
  AnnotationId: string;
  FileSizeInBytes: number;
}

/**
 * CommitAnnotationBlocksUpload action
 *
 * Unbound action
 */
export class CommitAnnotationBlocksUploadAction implements Executable<CommitAnnotationBlocksUploadResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly blockList: string[],
    public readonly fileContinuationToken: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitAnnotationBlocksUpload`;

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

  async parseResponse(response: Response): Promise<CommitAnnotationBlocksUploadResponse> {
    const data = await response.json();
    return data as CommitAnnotationBlocksUploadResponse;
  }
}
