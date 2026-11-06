import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UploadBlock message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UploadBlockRequestParameters {
  BlockId: string;
  BlockData: string;
  FileContinuationToken: string;
}

/**
 * UploadBlock request message
 *
 * Web API Action: UploadBlock
 */
export class UploadBlockRequest
  extends OrganizationRequest
  implements Executable<UploadBlockResponse>
{
  declare readonly Parameters: Readonly<UploadBlockRequestParameters>;

  constructor(parameters: UploadBlockRequestParameters) {
    super("UploadBlock", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UploadBlock`;

    const body = requestBody({
      BlockId: this.Parameters.BlockId,
      BlockData: this.Parameters.BlockData,
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

  parseResponse(_response: Response): Promise<UploadBlockResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new UploadBlockResponse());
  }
}

/**
 * UploadBlock response message
 */
export class UploadBlockResponse extends OrganizationResponse {
  constructor() {
    super("UploadBlock");
  }

  static fromResponse(_data?: unknown): UploadBlockResponse {
    return new UploadBlockResponse();
  }
}
