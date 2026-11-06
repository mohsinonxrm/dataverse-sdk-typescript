import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from InitializeAttachmentBlocksUpload action
 */
export interface InitializeAttachmentBlocksUploadResponse {
  FileContinuationToken: string;
}

/**
 * Parameters of the InitializeAttachmentBlocksUpload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeAttachmentBlocksUploadActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * InitializeAttachmentBlocksUpload action
 *
 * Unbound action
 */
export class InitializeAttachmentBlocksUploadAction implements Executable<InitializeAttachmentBlocksUploadResponse> {
  constructor(public readonly parameters: InitializeAttachmentBlocksUploadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAttachmentBlocksUpload`;

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

  async parseResponse(response: Response): Promise<InitializeAttachmentBlocksUploadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as InitializeAttachmentBlocksUploadResponse;
    return (await response.json()) as InitializeAttachmentBlocksUploadResponse;
  }
}
