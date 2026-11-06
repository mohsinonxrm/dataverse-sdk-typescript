import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { InitializeAnnotationBlocksDownloadResponse as InitializeAnnotationBlocksDownloadResponseData } from "./types/index.js";

/**
 * InitializeAnnotationBlocksDownload request message
 *
 * Web API Action: InitializeAnnotationBlocksDownload
 */
export class InitializeAnnotationBlocksDownloadRequest
  extends OrganizationRequest
  implements Executable<InitializeAnnotationBlocksDownloadResponse>
{
  constructor(public target: EntityReference | AnyEntityPayload) {
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
}

/**
 * InitializeAnnotationBlocksDownload response message
 */
export class InitializeAnnotationBlocksDownloadResponse extends OrganizationResponse {
  constructor(public result: InitializeAnnotationBlocksDownloadResponseData) {
    super("InitializeAnnotationBlocksDownload");
  }

  static fromResponse(data: unknown): InitializeAnnotationBlocksDownloadResponse {
    return new InitializeAnnotationBlocksDownloadResponse(
      responseObject<InitializeAnnotationBlocksDownloadResponseData>(data)
    );
  }
}
