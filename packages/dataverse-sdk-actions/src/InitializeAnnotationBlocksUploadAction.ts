import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from InitializeAnnotationBlocksUpload action
 */
export interface InitializeAnnotationBlocksUploadResponse {
  FileContinuationToken: string;
}

/**
 * Parameters of the InitializeAnnotationBlocksUpload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeAnnotationBlocksUploadActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * InitializeAnnotationBlocksUpload action
 *
 * Unbound action
 */
export class InitializeAnnotationBlocksUploadAction implements Executable<InitializeAnnotationBlocksUploadResponse> {
  constructor(public readonly parameters: InitializeAnnotationBlocksUploadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAnnotationBlocksUpload`;

    const body = requestBody({
      Target: this.parameters.Target,
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

  async parseResponse(response: Response): Promise<InitializeAnnotationBlocksUploadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as InitializeAnnotationBlocksUploadResponse;
    return (await response.json()) as InitializeAnnotationBlocksUploadResponse;
  }
}
