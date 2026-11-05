import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { CommitAttachmentBlocksUploadResponse as CommitAttachmentBlocksUploadResponseData } from "./types/index.js";

/**
 * CommitAttachmentBlocksUpload request message
 *
 * Web API Action: CommitAttachmentBlocksUpload
 */
export class CommitAttachmentBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<CommitAttachmentBlocksUploadResponse>
{
  constructor(
    public target: EntityReference,
    public blockList: string[],
    public fileContinuationToken: string
  ) {
    super("CommitAttachmentBlocksUpload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitAttachmentBlocksUpload`;

    const body: Record<string, unknown> = {
      Target: this.target,
      BlockList: this.blockList,
      FileContinuationToken: this.fileContinuationToken,
    };

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
    const data = await response.json();
    return CommitAttachmentBlocksUploadResponse.fromResponse(data);
  }
}

/**
 * CommitAttachmentBlocksUpload response message
 */
export class CommitAttachmentBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: CommitAttachmentBlocksUploadResponseData) {
    super("CommitAttachmentBlocksUpload");
  }

  static fromResponse(data: unknown): CommitAttachmentBlocksUploadResponse {
    return new CommitAttachmentBlocksUploadResponse(
      responseObject<CommitAttachmentBlocksUploadResponseData>(data)
    );
  }
}
