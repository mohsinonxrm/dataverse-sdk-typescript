import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from InitializeTemporaryFileBlocksUpload action
 */
export interface InitializeTemporaryFileBlocksUploadResponse {
  RecordId: string;
  FileContinuationToken: string;
}

/**
 * Parameters of the InitializeTemporaryFileBlocksUpload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeTemporaryFileBlocksUploadActionParameters {
  FileName: string;
  FileSize: number;
}

/**
 * InitializeTemporaryFileBlocksUpload action
 *
 * Unbound action
 */
export class InitializeTemporaryFileBlocksUploadAction implements Executable<InitializeTemporaryFileBlocksUploadResponse> {
  constructor(public readonly parameters: InitializeTemporaryFileBlocksUploadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeTemporaryFileBlocksUpload`;

    const body = requestBody({
      FileName: this.parameters.FileName,
      FileSize: this.parameters.FileSize,
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

  async parseResponse(response: Response): Promise<InitializeTemporaryFileBlocksUploadResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as InitializeTemporaryFileBlocksUploadResponse;
  }
}
