import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { InitializeAttachmentBlocksUploadResponse as InitializeAttachmentBlocksUploadResponseData } from "./types/index.js";

/**
 * InitializeAttachmentBlocksUpload request message
 *
 * Web API Action: InitializeAttachmentBlocksUpload
 */
export class InitializeAttachmentBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<InitializeAttachmentBlocksUploadResponse>
{
  constructor(public target: EntityReference) {
    super("InitializeAttachmentBlocksUpload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAttachmentBlocksUpload`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<InitializeAttachmentBlocksUploadResponse> {
    const data = await response.json();
    return InitializeAttachmentBlocksUploadResponse.fromResponse(data);
  }
}

/**
 * InitializeAttachmentBlocksUpload response message
 */
export class InitializeAttachmentBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: InitializeAttachmentBlocksUploadResponseData) {
    super("InitializeAttachmentBlocksUpload");
  }

  static fromResponse(data: unknown): InitializeAttachmentBlocksUploadResponse {
    return new InitializeAttachmentBlocksUploadResponse(
      responseObject<InitializeAttachmentBlocksUploadResponseData>(data)
    );
  }
}
