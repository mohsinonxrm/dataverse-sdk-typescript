import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from InitializeAttachmentBlocksDownload action
 */
export interface InitializeAttachmentBlocksDownloadResponse {
  FileName: string;
  FileSizeInBytes: number;
  FileContinuationToken: string;
}

/**
 * InitializeAttachmentBlocksDownload action
 *
 * Unbound action
 */
export class InitializeAttachmentBlocksDownloadAction implements Executable<InitializeAttachmentBlocksDownloadResponse> {
  constructor(public readonly target: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAttachmentBlocksDownload`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<InitializeAttachmentBlocksDownloadResponse> {
    const data = await response.json();
    return data as InitializeAttachmentBlocksDownloadResponse;
  }
}
