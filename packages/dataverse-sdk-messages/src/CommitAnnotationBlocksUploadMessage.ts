import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { CommitAnnotationBlocksUploadResponse as CommitAnnotationBlocksUploadResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CommitAnnotationBlocksUploadResponse> {
    const data = await response.json();
    return CommitAnnotationBlocksUploadResponse.fromResponse(data);
  }
}

/**
 * CommitAnnotationBlocksUpload response message
 */
export class CommitAnnotationBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: CommitAnnotationBlocksUploadResponseData) {
    super("CommitAnnotationBlocksUpload");
  }

  static fromResponse(data: unknown): CommitAnnotationBlocksUploadResponse {
    return new CommitAnnotationBlocksUploadResponse(
      responseObject<CommitAnnotationBlocksUploadResponseData>(data)
    );
  }
}
