import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from InitializeAttachmentBlocksDownload action
 */
export interface InitializeAttachmentBlocksDownloadResponse {
  FileName: string;
  FileSizeInBytes: number;
  FileContinuationToken: string;
}

/**
 * Parameters of the InitializeAttachmentBlocksDownload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeAttachmentBlocksDownloadActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * InitializeAttachmentBlocksDownload action
 *
 * Unbound action
 */
export class InitializeAttachmentBlocksDownloadAction implements Executable<InitializeAttachmentBlocksDownloadResponse> {
  constructor(public readonly parameters: InitializeAttachmentBlocksDownloadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAttachmentBlocksDownload`;

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

  async parseResponse(response: Response): Promise<InitializeAttachmentBlocksDownloadResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as InitializeAttachmentBlocksDownloadResponse;
  }
}
