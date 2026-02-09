import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UploadBlock action
 */
export interface UploadBlockResponse {
  // No content returned
}

/**
 * UploadBlock action
 *
 * Unbound action
 */
export class UploadBlockAction implements Executable<UploadBlockResponse> {
  constructor(
    public readonly blockId: string,
    public readonly blockData: string,
    public readonly fileContinuationToken: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UploadBlock`;

    const body: Record<string, unknown> = {
      BlockId: this.blockId,
      BlockData: this.blockData,
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

  async parseResponse(response: Response): Promise<UploadBlockResponse> {
    // No return value (204 No Content)
    return {};
  }
}
