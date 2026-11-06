import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { InitializeAttachmentBlocksUploadResponse as InitializeAttachmentBlocksUploadResponseData } from "./types/index.js";

/**
 * Parameters of the InitializeAttachmentBlocksUpload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeAttachmentBlocksUploadRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * InitializeAttachmentBlocksUpload request message
 *
 * Web API Action: InitializeAttachmentBlocksUpload
 */
export class InitializeAttachmentBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<InitializeAttachmentBlocksUploadResponse>
{
  declare readonly Parameters: Readonly<InitializeAttachmentBlocksUploadRequestParameters>;

  constructor(parameters: InitializeAttachmentBlocksUploadRequestParameters) {
    super("InitializeAttachmentBlocksUpload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAttachmentBlocksUpload`;

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

  async parseResponse(response: Response): Promise<InitializeAttachmentBlocksUploadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return InitializeAttachmentBlocksUploadResponse.fromResponse({});
    return InitializeAttachmentBlocksUploadResponse.fromResponse(await response.json());
  }
}

/**
 * InitializeAttachmentBlocksUpload response message
 */
export class InitializeAttachmentBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: InitializeAttachmentBlocksUploadResponseData) {
    super("InitializeAttachmentBlocksUpload");
  }

  static fromResponse(data: unknown): InitializeAttachmentBlocksUploadResponse {
    return new InitializeAttachmentBlocksUploadResponse(
      responseObject<InitializeAttachmentBlocksUploadResponseData>(data)
    );
  }
}
