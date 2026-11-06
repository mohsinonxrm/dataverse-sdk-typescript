import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from CommitAttachmentBlocksUpload action
 */
export interface CommitAttachmentBlocksUploadResponse {
  ActivityMimeAttachmentId: string;
  FileSizeInBytes: number;
}

/**
 * Parameters of the CommitAttachmentBlocksUpload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CommitAttachmentBlocksUploadActionParameters {
  Target: EntityReference | AnyEntityPayload;
  BlockList: string[];
  FileContinuationToken: string;
}

/**
 * CommitAttachmentBlocksUpload action
 *
 * Unbound action
 */
export class CommitAttachmentBlocksUploadAction implements Executable<CommitAttachmentBlocksUploadResponse> {
  constructor(public readonly parameters: CommitAttachmentBlocksUploadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitAttachmentBlocksUpload`;

    const body = requestBody({
      Target: this.parameters.Target,
      BlockList: this.parameters.BlockList,
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

  async parseResponse(response: Response): Promise<CommitAttachmentBlocksUploadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CommitAttachmentBlocksUploadResponse;
    return (await response.json()) as CommitAttachmentBlocksUploadResponse;
  }
}
