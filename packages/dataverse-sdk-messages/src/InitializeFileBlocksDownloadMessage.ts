import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { InitializeFileBlocksDownloadResponse as InitializeFileBlocksDownloadResponseData } from "./types/index.js";

/**
 * InitializeFileBlocksDownload request message
 *
 * Web API Action: InitializeFileBlocksDownload
 */
export class InitializeFileBlocksDownloadRequest
  extends OrganizationRequest
  implements Executable<InitializeFileBlocksDownloadResponse>
{
  constructor(
    public target: EntityReference | AnyEntityPayload,
    public fileAttributeName: string,
    public dataSource?: string
  ) {
    super("InitializeFileBlocksDownload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeFileBlocksDownload`;

    const body: Record<string, unknown> = {
      Target: this.target,
      FileAttributeName: this.fileAttributeName,
      DataSource: this.dataSource,
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

  async parseResponse(response: Response): Promise<InitializeFileBlocksDownloadResponse> {
    const data = await response.json();
    return InitializeFileBlocksDownloadResponse.fromResponse(data);
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
