import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return InitializeAttachmentBlocksDownloadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InitializeAttachmentBlocksDownload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InitializeAttachmentBlocksDownloadResult {
  "@odata.context"?: string;
  FileContinuationToken: string;
  FileName: string;
  FileSizeInBytes: number;
}

/**
 * InitializeAttachmentBlocksDownload response message
 *
 * `result` is the value the InitializeAttachmentBlocksDownload action returns (see {@link InitializeAttachmentBlocksDownloadResult}).
 */
export class InitializeAttachmentBlocksDownloadResponse extends OrganizationResponse {
  constructor(public result: InitializeAttachmentBlocksDownloadResult) {
    super("InitializeAttachmentBlocksDownload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InitializeAttachmentBlocksDownloadResponse {
    return new InitializeAttachmentBlocksDownloadResponse(
      data as InitializeAttachmentBlocksDownloadResult
    );
  }
}
