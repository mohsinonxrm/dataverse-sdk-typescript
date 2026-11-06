import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { CommitAttachmentBlocksUploadResponse as CommitAttachmentBlocksUploadResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return CommitAttachmentBlocksUploadResponse.fromResponse({});
    return CommitAttachmentBlocksUploadResponse.fromResponse(await response.json());
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
