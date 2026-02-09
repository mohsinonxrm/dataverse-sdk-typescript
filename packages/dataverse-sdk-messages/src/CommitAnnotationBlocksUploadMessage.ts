import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * CommitAnnotationBlocksUpload request message
 *
 * Web API Action: CommitAnnotationBlocksUpload
 */
export class CommitAnnotationBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<CommitAnnotationBlocksUploadResponse>
{
  constructor(
    public target: EntityReference,
    public blockList: string[],
    public fileContinuationToken: string
  ) {
    super("CommitAnnotationBlocksUpload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CommitAnnotationBlocksUpload`;

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

  async parseResponse(response: Response): Promise<CommitAnnotationBlocksUploadResponse> {
    const data = await response.json();
    return CommitAnnotationBlocksUploadResponse.fromResponse(data);
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
 * CommitAnnotationBlocksUpload response message
 */
export class CommitAnnotationBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: CommitAnnotationBlocksUploadResponse) {
    super("CommitAnnotationBlocksUpload");
  }

  static fromResponse(data: unknown): CommitAnnotationBlocksUploadResponse {
    return new CommitAnnotationBlocksUploadResponse((data as any).value);
  }
}
