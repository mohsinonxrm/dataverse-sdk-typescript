import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the CommitAnnotationBlocksUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CommitAnnotationBlocksUploadResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CommitAnnotationBlocksUploadResponse;
  }
}
