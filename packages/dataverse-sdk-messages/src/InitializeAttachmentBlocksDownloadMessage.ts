import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<InitializeAttachmentBlocksDownloadResponse> {
    const data = await response.json();
    return InitializeAttachmentBlocksDownloadResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
    };
  }
}

/**
 * InitializeAttachmentBlocksDownload response message
 */
export class InitializeAttachmentBlocksDownloadResponse extends OrganizationResponse {
  constructor(public result: InitializeAttachmentBlocksDownloadResponse) {
    super("InitializeAttachmentBlocksDownload");
  }

  static fromResponse(data: unknown): InitializeAttachmentBlocksDownloadResponse {
    return new InitializeAttachmentBlocksDownloadResponse((data as any).value);
  }
}
