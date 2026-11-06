import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { DownloadBlockResponse as DownloadBlockResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return DownloadBlockResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * DownloadBlock response message
 */
export class DownloadBlockResponse extends OrganizationResponse {
  constructor(public result: DownloadBlockResponseData) {
    super("DownloadBlock");
  }

  static fromResponse(data: unknown): DownloadBlockResponse {
    return new DownloadBlockResponse(responseObject<DownloadBlockResponseData>(data));
  }
}
