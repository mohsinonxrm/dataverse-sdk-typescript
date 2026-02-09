import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
    public target: EntityReference,
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<InitializeFileBlocksUploadResponse> {
    const data = await response.json();
    return InitializeFileBlocksUploadResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      FileName: this.fileName,
      FileAttributeName: this.fileAttributeName,
    };
  }
}

/**
 * InitializeFileBlocksUpload response message
 */
export class InitializeFileBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: InitializeFileBlocksUploadResponse) {
    super("InitializeFileBlocksUpload");
  }

  static fromResponse(data: unknown): InitializeFileBlocksUploadResponse {
    return new InitializeFileBlocksUploadResponse((data as any).value);
  }
}
