import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<DownloadBlockResponse> {
    const data = await response.json();
    return DownloadBlockResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Offset: this.offset,
      BlockLength: this.blockLength,
      FileContinuationToken: this.fileContinuationToken,
    };
  }
}

/**
 * DownloadBlock response message
 */
export class DownloadBlockResponse extends OrganizationResponse {
  constructor(public result: DownloadBlockResponse) {
    super("DownloadBlock");
  }

  static fromResponse(data: unknown): DownloadBlockResponse {
    return new DownloadBlockResponse((data as any).value);
  }
}
