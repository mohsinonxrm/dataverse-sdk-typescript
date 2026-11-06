import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { DownloadBlockResponse as DownloadBlockResponseData } from "./types/index.js";

/**
 * DownloadBlock request message
 *
 * Web API Action: DownloadBlock
 */
export class DownloadBlockRequest
  extends OrganizationRequest
  implements Executable<DownloadBlockResponse>
{
  constructor(
    public offset: number,
    public blockLength: number,
    public fileContinuationToken: string
  ) {
    super("DownloadBlock");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DownloadBlock`;

    const body: Record<string, unknown> = {
      Offset: this.offset,
      BlockLength: this.blockLength,
      FileContinuationToken: this.fileContinuationToken,
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

  async parseResponse(response: Response): Promise<DownloadBlockResponse> {
    const data = await response.json();
    return DownloadBlockResponse.fromResponse(data);
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
