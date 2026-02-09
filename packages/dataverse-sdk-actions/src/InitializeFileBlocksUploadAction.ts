import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from InitializeFileBlocksUpload action
 */
export interface InitializeFileBlocksUploadResponse {
  FileContinuationToken: string;
}

/**
 * InitializeFileBlocksUpload action
 *
 * Unbound action
 */
export class InitializeFileBlocksUploadAction implements Executable<InitializeFileBlocksUploadResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly fileName: string,
    public readonly fileAttributeName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeFileBlocksUpload`;

    const body: Record<string, unknown> = {
      Target: this.target,
      FileName: this.fileName,
      FileAttributeName: this.fileAttributeName,
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

  async parseResponse(response: Response): Promise<InitializeFileBlocksUploadResponse> {
    const data = await response.json();
    return data as InitializeFileBlocksUploadResponse;
  }
}
