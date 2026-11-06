import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { InitializeFileBlocksUploadResponse as InitializeFileBlocksUploadResponseData } from "./types/index.js";

/**
 * Parameters of the InitializeFileBlocksUpload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeFileBlocksUploadRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  FileName: string;
  FileAttributeName: string;
}

/**
 * InitializeFileBlocksUpload request message
 *
 * Web API Action: InitializeFileBlocksUpload
 */
export class InitializeFileBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<InitializeFileBlocksUploadResponse>
{
  declare readonly Parameters: Readonly<InitializeFileBlocksUploadRequestParameters>;

  constructor(parameters: InitializeFileBlocksUploadRequestParameters) {
    super("InitializeFileBlocksUpload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeFileBlocksUpload`;

    const body = requestBody({
      Target: this.Parameters.Target,
      FileName: this.Parameters.FileName,
      FileAttributeName: this.Parameters.FileAttributeName,
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

  async parseResponse(response: Response): Promise<InitializeFileBlocksUploadResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return InitializeFileBlocksUploadResponse.fromResponse(text ? JSON.parse(text) : {});
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
