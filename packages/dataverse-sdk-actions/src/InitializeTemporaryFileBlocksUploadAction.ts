import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the InitializeTemporaryFileBlocksUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InitializeTemporaryFileBlocksUploadResponse {
  "@odata.context"?: string;
  FileContinuationToken: string;
  RecordId: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as InitializeTemporaryFileBlocksUploadResponse;
  }
}
