import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return InitializeFileBlocksUploadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InitializeFileBlocksUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface InitializeFileBlocksUploadResult {
  "@odata.context"?: string;
  FileContinuationToken: string;
}

/**
 * InitializeFileBlocksUpload response message
 *
 * `result` is the value the InitializeFileBlocksUpload action returns (see {@link InitializeFileBlocksUploadResult}).
 */
export class InitializeFileBlocksUploadResponse extends OrganizationResponse {
  constructor(public result: InitializeFileBlocksUploadResult) {
    super("InitializeFileBlocksUpload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InitializeFileBlocksUploadResponse {
    return new InitializeFileBlocksUploadResponse(data as InitializeFileBlocksUploadResult);
  }
}
