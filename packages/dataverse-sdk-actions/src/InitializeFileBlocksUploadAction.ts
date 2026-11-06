import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from InitializeFileBlocksUpload action
 */
export interface InitializeFileBlocksUploadResponse {
  FileContinuationToken: string;
}

/**
 * Parameters of the InitializeFileBlocksUpload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeFileBlocksUploadActionParameters {
  Target: EntityReference | AnyEntityPayload;
  FileName: string;
  FileAttributeName: string;
}

/**
 * InitializeFileBlocksUpload action
 *
 * Unbound action
 */
export class InitializeFileBlocksUploadAction implements Executable<InitializeFileBlocksUploadResponse> {
  constructor(public readonly parameters: InitializeFileBlocksUploadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeFileBlocksUpload`;

    const body = requestBody({
      Target: this.parameters.Target,
      FileName: this.parameters.FileName,
      FileAttributeName: this.parameters.FileAttributeName,
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

  async parseResponse(response: Response): Promise<InitializeFileBlocksUploadResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as InitializeFileBlocksUploadResponse;
  }
}
