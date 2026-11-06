import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ExternalContextCommitTranscriptUploadResponse as msdyn_ExternalContextCommitTranscriptUploadResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ExternalContextCommitTranscriptUploadResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_ExternalContextCommitTranscriptUpload response message
 */
export class msdyn_ExternalContextCommitTranscriptUploadResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExternalContextCommitTranscriptUploadResponseData) {
    super("msdyn_ExternalContextCommitTranscriptUpload");
  }

  static fromResponse(data: unknown): msdyn_ExternalContextCommitTranscriptUploadResponse {
    return new msdyn_ExternalContextCommitTranscriptUploadResponse(
      responseObject<msdyn_ExternalContextCommitTranscriptUploadResponseData>(data)
    );
  }
}
