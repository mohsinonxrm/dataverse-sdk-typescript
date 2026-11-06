import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from InitializeAttachmentBlocksDownload action
 */
export interface InitializeAttachmentBlocksDownloadResponse {
  FileContinuationToken: string;
  FileName: string;
  FileSizeInBytes: number;
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as InitializeAttachmentBlocksDownloadResponse;
    return (await response.json()) as InitializeAttachmentBlocksDownloadResponse;
  }
}
