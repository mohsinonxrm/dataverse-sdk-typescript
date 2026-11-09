import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return InitializeFileBlocksDownloadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InitializeFileBlocksDownload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InitializeFileBlocksDownloadResult {
  "@odata.context"?: string;
  FileContinuationToken: string;
  FileName: string;
  FileSizeInBytes: number;
  IsChunkingSupported: boolean;
}

/**
 * InitializeFileBlocksDownload response message
 *
 * `result` is the value the InitializeFileBlocksDownload action returns (see {@link InitializeFileBlocksDownloadResult}).
 */
export class InitializeFileBlocksDownloadResponse extends OrganizationResponse {
  constructor(public result: InitializeFileBlocksDownloadResult) {
    super("InitializeFileBlocksDownload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InitializeFileBlocksDownloadResponse {
    return new InitializeFileBlocksDownloadResponse(data as InitializeFileBlocksDownloadResult);
  }
}
