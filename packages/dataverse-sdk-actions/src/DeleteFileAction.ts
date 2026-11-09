import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DeleteFile action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type DeleteFileResponse = void;

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

  parseResponse(_response: Response): Promise<DeleteFileResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
