import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * InitializeAnnotationBlocksDownload request message
 *
 * Web API Action: InitializeAnnotationBlocksDownload
 */
export class InitializeAnnotationBlocksDownloadRequest
  extends OrganizationRequest
  implements Executable<InitializeAnnotationBlocksDownloadResponse>
{
  constructor(public target: EntityReference) {
    super("InitializeAnnotationBlocksDownload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAnnotationBlocksDownload`;

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

  async parseResponse(response: Response): Promise<InitializeAnnotationBlocksDownloadResponse> {
    const data = await response.json();
    return InitializeAnnotationBlocksDownloadResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
    };
  }
}

/**
 * InitializeAnnotationBlocksDownload response message
 */
export class InitializeAnnotationBlocksDownloadResponse extends OrganizationResponse {
  constructor(public result: InitializeAnnotationBlocksDownloadResponse) {
    super("InitializeAnnotationBlocksDownload");
  }

  static fromResponse(data: unknown): InitializeAnnotationBlocksDownloadResponse {
    return new InitializeAnnotationBlocksDownloadResponse((data as any).value);
  }
}
