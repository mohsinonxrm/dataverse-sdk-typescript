import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from InitializeTemporaryFileBlocksUpload action
 */
export interface InitializeTemporaryFileBlocksUploadResponse {
  RecordId: string;
  FileContinuationToken: string;
}

/**
 * InitializeTemporaryFileBlocksUpload action
 *
 * Unbound action
 */
export class InitializeTemporaryFileBlocksUploadAction implements Executable<InitializeTemporaryFileBlocksUploadResponse> {
  constructor(
    public readonly fileName: string,
    public readonly fileSize: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeTemporaryFileBlocksUpload`;

    const body: Record<string, unknown> = {
      FileName: this.fileName,
      FileSize: this.fileSize,
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

  async parseResponse(response: Response): Promise<InitializeTemporaryFileBlocksUploadResponse> {
    const data = await response.json();
    return data as InitializeTemporaryFileBlocksUploadResponse;
  }
}
