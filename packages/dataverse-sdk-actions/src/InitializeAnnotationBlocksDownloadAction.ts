import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from InitializeAnnotationBlocksDownload action
 */
export interface InitializeAnnotationBlocksDownloadResponse {
  FileContinuationToken: string;
  FileSizeInBytes: number;
  FileName: string;
}

/**
 * InitializeAnnotationBlocksDownload action
 *
 * Unbound action
 */
export class InitializeAnnotationBlocksDownloadAction implements Executable<InitializeAnnotationBlocksDownloadResponse> {
  constructor(public readonly target: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAnnotationBlocksDownload`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<InitializeAnnotationBlocksDownloadResponse> {
    const data = await response.json();
    return data as InitializeAnnotationBlocksDownloadResponse;
  }
}
