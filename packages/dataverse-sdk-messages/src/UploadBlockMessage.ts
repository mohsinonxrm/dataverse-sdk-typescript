import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UploadBlock request message
 *
 * Web API Action: UploadBlock
 */
export class UploadBlockRequest
  extends OrganizationRequest
  implements Executable<UploadBlockResponse>
{
  constructor(
    public blockId: string,
    public blockData: string,
    public fileContinuationToken: string
  ) {
    super("UploadBlock");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UploadBlock`;

    const body: Record<string, unknown> = {
      BlockId: this.blockId,
      BlockData: this.blockData,
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

  async parseResponse(response: Response): Promise<UploadBlockResponse> {
    // No return value (204 No Content)
    return new UploadBlockResponse();
  }
}

/**
 * UploadBlock response message
 */
export class UploadBlockResponse extends OrganizationResponse {
  constructor() {
    super("UploadBlock");
  }

  static fromResponse(_data: unknown): UploadBlockResponse {
    return new UploadBlockResponse();
  }
}
