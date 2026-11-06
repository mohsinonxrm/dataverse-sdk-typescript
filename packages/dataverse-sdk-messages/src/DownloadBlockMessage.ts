import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DownloadBlock message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DownloadBlockRequestParameters {
  Offset: number;
  BlockLength: number;
  FileContinuationToken: string;
}

/**
 * DownloadBlock request message
 *
 * Web API Action: DownloadBlock
 */
export class DownloadBlockRequest
  extends OrganizationRequest
  implements Executable<DownloadBlockResponse>
{
  declare readonly Parameters: Readonly<DownloadBlockRequestParameters>;

  constructor(parameters: DownloadBlockRequestParameters) {
    super("DownloadBlock", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DownloadBlock`;

    const body = requestBody({
      Offset: this.Parameters.Offset,
      BlockLength: this.Parameters.BlockLength,
      FileContinuationToken: this.Parameters.FileContinuationToken,
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

  async parseResponse(response: Response): Promise<DownloadBlockResponse> {
    // The body is the complex value, with its @odata.context
    return DownloadBlockResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DownloadBlock action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DownloadBlockResult {
  "@odata.context"?: string;
  Data: string;
}

/**
 * DownloadBlock response message
 *
 * `result` is the value the DownloadBlock action returns (see {@link DownloadBlockResult}).
 */
export class DownloadBlockResponse extends OrganizationResponse {
  constructor(public result: DownloadBlockResult) {
    super("DownloadBlock");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DownloadBlockResponse {
    return new DownloadBlockResponse(data as DownloadBlockResult);
  }
}
