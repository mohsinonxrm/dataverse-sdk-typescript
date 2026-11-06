import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UploadBlock action
 */
export interface UploadBlockResponse {
  // No content returned
}

/**
 * Parameters of the UploadBlock action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UploadBlockActionParameters {
  BlockId: string;
  BlockData: string;
  FileContinuationToken: string;
}

/**
 * UploadBlock action
 *
 * Unbound action
 */
export class UploadBlockAction implements Executable<UploadBlockResponse> {
  constructor(public readonly parameters: UploadBlockActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UploadBlock`;

    const body = requestBody({
      BlockId: this.parameters.BlockId,
      BlockData: this.parameters.BlockData,
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

  async parseResponse(response: Response): Promise<UploadBlockResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as UploadBlockResponse;
  }
}
