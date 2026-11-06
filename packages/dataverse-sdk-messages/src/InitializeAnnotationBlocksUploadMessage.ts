import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { InitializeAnnotationBlocksUploadResponse as InitializeAnnotationBlocksUploadResponseData } from "./types/index.js";

/**
 * InitializeAnnotationBlocksUpload request message
 *
 * Web API Action: InitializeAnnotationBlocksUpload
 */
export class InitializeAnnotationBlocksUploadRequest
  extends OrganizationRequest
  implements Executable<InitializeAnnotationBlocksUploadResponse>
{
  constructor(public target: EntityReference | AnyEntityPayload) {
    super("InitializeAnnotationBlocksUpload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InitializeAnnotationBlocksUpload`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<InitializeAnnotationBlocksUploadResponse> {
    const data = await response.json();
    return InitializeAnnotationBlocksUploadResponse.fromResponse(data);
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
