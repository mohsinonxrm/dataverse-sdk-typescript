import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DownloadBlock action
 */
export interface DownloadBlockResponse {
  Data: string;
}

/**
 * Parameters of the DownloadBlock action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DownloadBlockActionParameters {
  Offset: number;
  BlockLength: number;
  FileContinuationToken: string;
}

/**
 * DownloadBlock action
 *
 * Unbound action
 */
export class DownloadBlockAction implements Executable<DownloadBlockResponse> {
  constructor(public readonly parameters: DownloadBlockActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DownloadBlock`;

    const body = requestBody({
      Offset: this.parameters.Offset,
      BlockLength: this.parameters.BlockLength,
      FileContinuationToken: this.parameters.FileContinuationToken,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as DownloadBlockResponse;
    return (await response.json()) as DownloadBlockResponse;
  }
}
