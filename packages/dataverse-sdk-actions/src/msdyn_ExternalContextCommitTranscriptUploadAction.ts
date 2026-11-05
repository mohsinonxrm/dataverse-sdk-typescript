import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ExternalContextCommitTranscriptUpload action
 */
export interface msdyn_ExternalContextCommitTranscriptUploadResponse {
  FileId: string;
}

/**
 * msdyn_ExternalContextCommitTranscriptUpload action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocexternalcontext)
 */
export class msdyn_ExternalContextCommitTranscriptUploadAction implements Executable<msdyn_ExternalContextCommitTranscriptUploadResponse> {
  constructor(
    public readonly msdyn_ocexternalcontextId: string,
    public readonly fileContinuationToken: string,
    public readonly blockList: string[]
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_ExternalContextCommitTranscriptUploadResponse> {
    const data = await response.json();
    return data as msdyn_ExternalContextCommitTranscriptUploadResponse;
  }
}
