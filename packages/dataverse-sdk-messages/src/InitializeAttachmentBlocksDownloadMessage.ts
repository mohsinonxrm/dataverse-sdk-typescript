import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { InitializeAttachmentBlocksDownloadResponse as InitializeAttachmentBlocksDownloadResponseData } from "./types/index.js";

/**
 * InitializeAttachmentBlocksDownload request message
 *
 * Web API Action: InitializeAttachmentBlocksDownload
 */
export class InitializeAttachmentBlocksDownloadRequest
  extends OrganizationRequest
  implements Executable<InitializeAttachmentBlocksDownloadResponse>
{
  constructor(public target: EntityReference) {
    super("InitializeAttachmentBlocksDownload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAttachmentBlocksDownload`;

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

  async parseResponse(response: Response): Promise<InitializeAttachmentBlocksDownloadResponse> {
    const data = await response.json();
    return InitializeAttachmentBlocksDownloadResponse.fromResponse(data);
  }
}

/**
 * InitializeAttachmentBlocksDownload response message
 */
export class InitializeAttachmentBlocksDownloadResponse extends OrganizationResponse {
  constructor(public result: InitializeAttachmentBlocksDownloadResponseData) {
    super("InitializeAttachmentBlocksDownload");
  }

  static fromResponse(data: unknown): InitializeAttachmentBlocksDownloadResponse {
    return new InitializeAttachmentBlocksDownloadResponse(
      responseObject<InitializeAttachmentBlocksDownloadResponseData>(data)
    );
  }
}
