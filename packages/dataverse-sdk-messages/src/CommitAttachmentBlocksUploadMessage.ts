import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CommitAttachmentBlocksUploadResponse> {
    const data = await response.json();
    return CommitAttachmentBlocksUploadResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      BlockList: this.blockList,
      FileContinuationToken: this.fileContinuationToken,
    };
  }
}

/**
 * CommitAttachmentBlocksUpload response message
 */
export class CommitAttachmentBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: CommitAttachmentBlocksUploadResponse) {
    super("CommitAttachmentBlocksUpload");
  }

  static fromResponse(data: unknown): CommitAttachmentBlocksUploadResponse {
    return new CommitAttachmentBlocksUploadResponse((data as any).value);
  }
}
