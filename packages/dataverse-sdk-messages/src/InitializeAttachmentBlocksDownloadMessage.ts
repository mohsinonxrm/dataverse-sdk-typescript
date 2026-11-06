import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { InitializeAttachmentBlocksDownloadResponse as InitializeAttachmentBlocksDownloadResponseData } from "./types/index.js";

/**
 * Parameters of the InitializeAttachmentBlocksDownload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeAttachmentBlocksDownloadRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * InitializeAttachmentBlocksDownload request message
 *
 * Web API Action: InitializeAttachmentBlocksDownload
 */
export class InitializeAttachmentBlocksDownloadRequest
  extends OrganizationRequest
  implements Executable<InitializeAttachmentBlocksDownloadResponse>
{
  declare readonly Parameters: Readonly<InitializeAttachmentBlocksDownloadRequestParameters>;

  constructor(parameters: InitializeAttachmentBlocksDownloadRequestParameters) {
    super("InitializeAttachmentBlocksDownload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAttachmentBlocksDownload`;

    const body = requestBody({
      Target: this.Parameters.Target,
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

  async parseResponse(response: Response): Promise<InitializeAttachmentBlocksDownloadResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return InitializeAttachmentBlocksDownloadResponse.fromResponse(text ? JSON.parse(text) : {});
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
