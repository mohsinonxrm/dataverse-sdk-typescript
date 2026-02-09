import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ExternalContextCommitTranscriptUpload request message
 *
 * Web API Action: msdyn_ExternalContextCommitTranscriptUpload
 */
export class msdyn_ExternalContextCommitTranscriptUploadRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExternalContextCommitTranscriptUploadResponse>
{
  constructor(
    public msdyn_ocexternalcontextId: string,
    public fileContinuationToken: string,
    public blockList: string[]
  ) {
    super("msdyn_ExternalContextCommitTranscriptUpload");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocexternalcontexts(${this.msdyn_ocexternalcontextId})/Microsoft.Dynamics.CRM.msdyn_ExternalContextCommitTranscriptUpload`;

    const body: Record<string, unknown> = {
      FileContinuationToken: this.fileContinuationToken,
      BlockList: this.blockList,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_ExternalContextCommitTranscriptUploadResponse> {
    const data = await response.json();
    return msdyn_ExternalContextCommitTranscriptUploadResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocexternalcontextId,
      FileContinuationToken: this.fileContinuationToken,
      BlockList: this.blockList,
    };
  }
}

/**
 * msdyn_ExternalContextCommitTranscriptUpload response message
 */
export class msdyn_ExternalContextCommitTranscriptUploadResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExternalContextCommitTranscriptUploadResponse) {
    super("msdyn_ExternalContextCommitTranscriptUpload");
  }

  static fromResponse(data: unknown): msdyn_ExternalContextCommitTranscriptUploadResponse {
    return new msdyn_ExternalContextCommitTranscriptUploadResponse((data as any).value);
  }
}
