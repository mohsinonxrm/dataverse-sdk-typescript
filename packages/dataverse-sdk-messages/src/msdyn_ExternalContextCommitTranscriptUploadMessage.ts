import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ExternalContextCommitTranscriptUpload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExternalContextCommitTranscriptUploadRequestParameters {
  FileContinuationToken: string;
  BlockList: string[];
}

/**
 * msdyn_ExternalContextCommitTranscriptUpload request message
 *
 * Web API Action: msdyn_ExternalContextCommitTranscriptUpload
 *
 * The first argument is the id of the msdyn_ocexternalcontext record to call it on.
 */
export class msdyn_ExternalContextCommitTranscriptUploadRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExternalContextCommitTranscriptUploadResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExternalContextCommitTranscriptUploadRequestParameters>;

  constructor(
    public msdyn_ocexternalcontextId: string,
    parameters: msdyn_ExternalContextCommitTranscriptUploadRequestParameters
  ) {
    super("msdyn_ExternalContextCommitTranscriptUpload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocexternalcontexts(${this.msdyn_ocexternalcontextId})/Microsoft.Dynamics.CRM.msdyn_ExternalContextCommitTranscriptUpload`;

    const body = requestBody({
      FileContinuationToken: this.Parameters.FileContinuationToken,
      BlockList: this.Parameters.BlockList,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_ExternalContextCommitTranscriptUploadResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ExternalContextCommitTranscriptUploadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExternalContextCommitTranscriptUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExternalContextCommitTranscriptUploadResult {
  "@odata.context"?: string;
  FileId: string;
}

/**
 * msdyn_ExternalContextCommitTranscriptUpload response message
 *
 * `result` is the value the msdyn_ExternalContextCommitTranscriptUpload action returns (see {@link msdyn_ExternalContextCommitTranscriptUploadResult}).
 */
export class msdyn_ExternalContextCommitTranscriptUploadResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExternalContextCommitTranscriptUploadResult) {
    super("msdyn_ExternalContextCommitTranscriptUpload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExternalContextCommitTranscriptUploadResponse {
    return new msdyn_ExternalContextCommitTranscriptUploadResponse(
      data as msdyn_ExternalContextCommitTranscriptUploadResult
    );
  }
}
