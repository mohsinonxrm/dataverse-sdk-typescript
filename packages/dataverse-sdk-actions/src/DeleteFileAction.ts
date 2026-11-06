import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DeleteFile action
 */
export interface DeleteFileResponse {
  // No content returned
}

/**
 * Parameters of the DeleteFile action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteFileActionParameters {
  FileId: string;
}

/**
 * DeleteFile action
 *
 * Unbound action
 */
export class DeleteFileAction implements Executable<DeleteFileResponse> {
  constructor(public readonly parameters: DeleteFileActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteFile`;

    const body = requestBody({
      FileId: this.parameters.FileId,
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

  async parseResponse(response: Response): Promise<DeleteFileResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as DeleteFileResponse;
  }
}
