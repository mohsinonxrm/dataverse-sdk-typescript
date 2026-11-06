import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { InitializeAnnotationBlocksUploadResponse as InitializeAnnotationBlocksUploadResponseData } from "./types/index.js";

/**
 * Parameters of the InitializeAnnotationBlocksUpload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InitializeAnnotationBlocksUploadRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * InitializeAnnotationBlocksUpload request message
 *
 * Web API Action: InitializeAnnotationBlocksUpload
 */
export class InitializeAnnotationBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<InitializeAnnotationBlocksUploadResponse>
{
  declare readonly Parameters: Readonly<InitializeAnnotationBlocksUploadRequestParameters>;

  constructor(parameters: InitializeAnnotationBlocksUploadRequestParameters) {
    super("InitializeAnnotationBlocksUpload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAnnotationBlocksUpload`;

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

  async parseResponse(response: Response): Promise<InitializeAnnotationBlocksUploadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return InitializeAnnotationBlocksUploadResponse.fromResponse({});
    return InitializeAnnotationBlocksUploadResponse.fromResponse(await response.json());
  }
}

/**
 * InitializeAnnotationBlocksUpload response message
 */
export class InitializeAnnotationBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: InitializeAnnotationBlocksUploadResponseData) {
    super("InitializeAnnotationBlocksUpload");
  }

  static fromResponse(data: unknown): InitializeAnnotationBlocksUploadResponse {
    return new InitializeAnnotationBlocksUploadResponse(
      responseObject<InitializeAnnotationBlocksUploadResponseData>(data)
    );
  }
}
