import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the CommitAnnotationBlocksUpload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CommitAnnotationBlocksUploadRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  BlockList: string[];
  FileContinuationToken: string;
}

/**
 * CommitAnnotationBlocksUpload request message
 *
 * Web API Action: CommitAnnotationBlocksUpload
 */
export class CommitAnnotationBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<CommitAnnotationBlocksUploadResponse>
{
  declare readonly Parameters: Readonly<CommitAnnotationBlocksUploadRequestParameters>;

  constructor(parameters: CommitAnnotationBlocksUploadRequestParameters) {
    super("CommitAnnotationBlocksUpload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitAnnotationBlocksUpload`;

    const body = requestBody({
      Target: this.Parameters.Target,
      BlockList: this.Parameters.BlockList,
      FileContinuationToken: this.Parameters.FileContinuationToken,
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
    return CommitAnnotationBlocksUploadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CommitAnnotationBlocksUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CommitAnnotationBlocksUploadResult {
  "@odata.context"?: string;
  AnnotationId: string;
  FileSizeInBytes: number;
}

/**
 * CommitAnnotationBlocksUpload response message
 *
 * `result` is the value the CommitAnnotationBlocksUpload action returns (see {@link CommitAnnotationBlocksUploadResult}).
 */
export class CommitAnnotationBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: CommitAnnotationBlocksUploadResult) {
    super("CommitAnnotationBlocksUpload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CommitAnnotationBlocksUploadResponse {
    return new CommitAnnotationBlocksUploadResponse(data as CommitAnnotationBlocksUploadResult);
  }
}
