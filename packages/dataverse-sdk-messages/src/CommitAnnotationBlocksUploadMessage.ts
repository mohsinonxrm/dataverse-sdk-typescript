import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { CommitAnnotationBlocksUploadResponse as CommitAnnotationBlocksUploadResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CommitAnnotationBlocksUploadResponse.fromResponse(text ? JSON.parse(text) : {});
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
