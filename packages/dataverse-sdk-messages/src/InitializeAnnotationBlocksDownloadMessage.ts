import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { InitializeAnnotationBlocksDownloadResponse as InitializeAnnotationBlocksDownloadResponseData } from "./types/index.js";

/**
 * Parameters of the InitializeAnnotationBlocksDownload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeAnnotationBlocksDownloadRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * InitializeAnnotationBlocksDownload request message
 *
 * Web API Action: InitializeAnnotationBlocksDownload
 */
export class InitializeAnnotationBlocksDownloadRequest
  extends OrganizationRequest
  implements Executable<InitializeAnnotationBlocksDownloadResponse>
{
  declare readonly Parameters: Readonly<InitializeAnnotationBlocksDownloadRequestParameters>;

  constructor(parameters: InitializeAnnotationBlocksDownloadRequestParameters) {
    super("InitializeAnnotationBlocksDownload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAnnotationBlocksDownload`;

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

  async parseResponse(response: Response): Promise<InitializeAnnotationBlocksDownloadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return InitializeAnnotationBlocksDownloadResponse.fromResponse({});
    return InitializeAnnotationBlocksDownloadResponse.fromResponse(await response.json());
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
