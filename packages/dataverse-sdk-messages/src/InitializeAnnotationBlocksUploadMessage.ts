import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return InitializeAnnotationBlocksUploadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InitializeAnnotationBlocksUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InitializeAnnotationBlocksUploadResult {
  "@odata.context"?: string;
  FileContinuationToken: string;
}

/**
 * InitializeAnnotationBlocksUpload response message
 *
 * `result` is the value the InitializeAnnotationBlocksUpload action returns (see {@link InitializeAnnotationBlocksUploadResult}).
 */
export class InitializeAnnotationBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: InitializeAnnotationBlocksUploadResult) {
    super("InitializeAnnotationBlocksUpload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InitializeAnnotationBlocksUploadResponse {
    return new InitializeAnnotationBlocksUploadResponse(
      data as InitializeAnnotationBlocksUploadResult
    );
  }
}
