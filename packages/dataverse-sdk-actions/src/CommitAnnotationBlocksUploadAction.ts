import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from CommitAnnotationBlocksUpload action
 */
export interface CommitAnnotationBlocksUploadResponse {
  AnnotationId: string;
  FileSizeInBytes: number;
}

/**
 * Parameters of the CommitAnnotationBlocksUpload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CommitAnnotationBlocksUploadActionParameters {
  Target: EntityReference | AnyEntityPayload;
  BlockList: string[];
  FileContinuationToken: string;
}

/**
 * CommitAnnotationBlocksUpload action
 *
 * Unbound action
 */
export class CommitAnnotationBlocksUploadAction implements Executable<CommitAnnotationBlocksUploadResponse> {
  constructor(public readonly parameters: CommitAnnotationBlocksUploadActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitAnnotationBlocksUpload`;

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

  async parseResponse(response: Response): Promise<CommitAnnotationBlocksUploadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CommitAnnotationBlocksUploadResponse;
    return (await response.json()) as CommitAnnotationBlocksUploadResponse;
  }
}
