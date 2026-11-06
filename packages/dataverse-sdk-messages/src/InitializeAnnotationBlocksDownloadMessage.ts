import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return InitializeAnnotationBlocksDownloadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InitializeAnnotationBlocksDownload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InitializeAnnotationBlocksDownloadResult {
  "@odata.context"?: string;
  FileContinuationToken: string;
  FileName: string;
  FileSizeInBytes: number;
}

/**
 * InitializeAnnotationBlocksDownload response message
 *
 * `result` is the value the InitializeAnnotationBlocksDownload action returns (see {@link InitializeAnnotationBlocksDownloadResult}).
 */
export class InitializeAnnotationBlocksDownloadResponse extends OrganizationResponse {
  constructor(public result: InitializeAnnotationBlocksDownloadResult) {
    super("InitializeAnnotationBlocksDownload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InitializeAnnotationBlocksDownloadResponse {
    return new InitializeAnnotationBlocksDownloadResponse(
      data as InitializeAnnotationBlocksDownloadResult
    );
  }
}
