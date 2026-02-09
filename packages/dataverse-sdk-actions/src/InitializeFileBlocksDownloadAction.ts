import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from InitializeFileBlocksDownload action
 */
export interface InitializeFileBlocksDownloadResponse {
  FileSizeInBytes: number;
  FileName: string;
  FileContinuationToken: string;
  IsChunkingSupported: boolean;
}

/**
 * InitializeFileBlocksDownload action
 *
 * Unbound action
 */
export class InitializeFileBlocksDownloadAction implements Executable<InitializeFileBlocksDownloadResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly fileAttributeName: string,
    public readonly dataSource: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeFileBlocksDownload`;

    const body: Record<string, unknown> = {
      Target: this.target,
      FileAttributeName: this.fileAttributeName,
      DataSource: this.dataSource,
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

  async parseResponse(response: Response): Promise<InitializeFileBlocksDownloadResponse> {
    const data = await response.json();
    return data as InitializeFileBlocksDownloadResponse;
  }
}
