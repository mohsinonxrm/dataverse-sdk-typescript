import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UploadBlock action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UploadBlockResponse = void;

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

  parseResponse(_response: Response): Promise<UploadBlockResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
