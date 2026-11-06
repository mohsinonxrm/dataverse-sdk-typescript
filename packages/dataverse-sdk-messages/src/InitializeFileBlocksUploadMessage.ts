import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { InitializeFileBlocksUploadResponse as InitializeFileBlocksUploadResponseData } from "./types/index.js";

/**
 * InitializeFileBlocksUpload request message
 *
 * Web API Action: InitializeFileBlocksUpload
 */
export class InitializeFileBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<InitializeFileBlocksUploadResponse>
{
  constructor(
    public target: EntityReference | AnyEntityPayload,
    public fileName: string,
    public fileAttributeName: string
  ) {
    super("InitializeFileBlocksUpload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeFileBlocksUpload`;

    const body: Record<string, unknown> = {
      Target: this.target,
      FileName: this.fileName,
      FileAttributeName: this.fileAttributeName,
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

  async parseResponse(response: Response): Promise<InitializeFileBlocksUploadResponse> {
    const data = await response.json();
    return InitializeFileBlocksUploadResponse.fromResponse(data);
  }
}

/**
 * InitializeFileBlocksUpload response message
 */
export class InitializeFileBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: InitializeFileBlocksUploadResponseData) {
    super("InitializeFileBlocksUpload");
  }

  static fromResponse(data: unknown): InitializeFileBlocksUploadResponse {
    return new InitializeFileBlocksUploadResponse(
      responseObject<InitializeFileBlocksUploadResponseData>(data)
    );
  }
}
