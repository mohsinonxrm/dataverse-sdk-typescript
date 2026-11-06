import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { InitializeFileBlocksDownloadResponse as InitializeFileBlocksDownloadResponseData } from "./types/index.js";

/**
 * Parameters of the InitializeFileBlocksDownload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeFileBlocksDownloadRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  FileAttributeName: string;
  DataSource?: string;
}

/**
 * InitializeFileBlocksDownload request message
 *
 * Web API Action: InitializeFileBlocksDownload
 */
export class InitializeFileBlocksDownloadRequest
  extends OrganizationRequest
  implements Executable<InitializeFileBlocksDownloadResponse>
{
  declare readonly Parameters: Readonly<InitializeFileBlocksDownloadRequestParameters>;

  constructor(parameters: InitializeFileBlocksDownloadRequestParameters) {
    super("InitializeFileBlocksDownload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeFileBlocksDownload`;

    const body = requestBody({
      Target: this.Parameters.Target,
      FileAttributeName: this.Parameters.FileAttributeName,
      DataSource: this.Parameters.DataSource,
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

  async parseResponse(response: Response): Promise<InitializeFileBlocksDownloadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return InitializeFileBlocksDownloadResponse.fromResponse({});
    return InitializeFileBlocksDownloadResponse.fromResponse(await response.json());
  }
}

/**
 * InitializeFileBlocksDownload response message
 */
export class InitializeFileBlocksDownloadResponse extends OrganizationResponse {
  constructor(public result: InitializeFileBlocksDownloadResponseData) {
    super("InitializeFileBlocksDownload");
  }

  static fromResponse(data: unknown): InitializeFileBlocksDownloadResponse {
    return new InitializeFileBlocksDownloadResponse(
      responseObject<InitializeFileBlocksDownloadResponseData>(data)
    );
  }
}
