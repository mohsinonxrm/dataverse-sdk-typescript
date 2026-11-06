import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the CommitAttachmentBlocksUpload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CommitAttachmentBlocksUploadRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  BlockList: string[];
  FileContinuationToken: string;
}

/**
 * CommitAttachmentBlocksUpload request message
 *
 * Web API Action: CommitAttachmentBlocksUpload
 */
export class CommitAttachmentBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<CommitAttachmentBlocksUploadResponse>
{
  declare readonly Parameters: Readonly<CommitAttachmentBlocksUploadRequestParameters>;

  constructor(parameters: CommitAttachmentBlocksUploadRequestParameters) {
    super("CommitAttachmentBlocksUpload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitAttachmentBlocksUpload`;

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

  async parseResponse(response: Response): Promise<CommitAttachmentBlocksUploadResponse> {
    // The body is the complex value, with its @odata.context
    return CommitAttachmentBlocksUploadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CommitAttachmentBlocksUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CommitAttachmentBlocksUploadResult {
  "@odata.context"?: string;
  ActivityMimeAttachmentId: string;
  FileSizeInBytes: number;
}

/**
 * CommitAttachmentBlocksUpload response message
 *
 * `result` is the value the CommitAttachmentBlocksUpload action returns (see {@link CommitAttachmentBlocksUploadResult}).
 */
export class CommitAttachmentBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: CommitAttachmentBlocksUploadResult) {
    super("CommitAttachmentBlocksUpload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CommitAttachmentBlocksUploadResponse {
    return new CommitAttachmentBlocksUploadResponse(data as CommitAttachmentBlocksUploadResult);
  }
}
