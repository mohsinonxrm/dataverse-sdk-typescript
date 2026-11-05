import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
    };
  }
}

/**
 * InitializeAttachmentBlocksUpload response message
 */
export class InitializeAttachmentBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: InitializeAttachmentBlocksUploadResponse) {
    super("InitializeAttachmentBlocksUpload");
  }

  static fromResponse(data: unknown): InitializeAttachmentBlocksUploadResponse {
    return new InitializeAttachmentBlocksUploadResponse((data as any).value);
  }
}
