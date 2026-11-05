import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DownloadBlock action
 */
export interface DownloadBlockResponse {
  Data: string;
}

/**
 * DownloadBlock action
 *
 * Unbound action
 */
export class DownloadBlockAction implements Executable<DownloadBlockResponse> {
  constructor(
    public readonly offset: number,
    public readonly blockLength: number,
    public readonly fileContinuationToken: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DownloadBlock`;

    const body: Record<string, unknown> = {
      Offset: this.offset,
      BlockLength: this.blockLength,
      FileContinuationToken: this.fileContinuationToken,
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

  async parseResponse(response: Response): Promise<DownloadBlockResponse> {
    const data = await response.json();
    return data as DownloadBlockResponse;
  }
}
