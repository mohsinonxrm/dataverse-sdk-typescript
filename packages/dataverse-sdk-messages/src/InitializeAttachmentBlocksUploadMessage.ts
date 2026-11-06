import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return InitializeAttachmentBlocksUploadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InitializeAttachmentBlocksUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InitializeAttachmentBlocksUploadResult {
  "@odata.context"?: string;
  FileContinuationToken: string;
}

/**
 * InitializeAttachmentBlocksUpload response message
 *
 * `result` is the value the InitializeAttachmentBlocksUpload action returns (see {@link InitializeAttachmentBlocksUploadResult}).
 */
export class InitializeAttachmentBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: InitializeAttachmentBlocksUploadResult) {
    super("InitializeAttachmentBlocksUpload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InitializeAttachmentBlocksUploadResponse {
    return new InitializeAttachmentBlocksUploadResponse(
      data as InitializeAttachmentBlocksUploadResult
    );
  }
}
