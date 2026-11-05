import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ExternalContextUploadTranscriptBlocks action
 */
export interface msdyn_ExternalContextUploadTranscriptBlocksResponse {
  BlockList: string[];
}

/**
 * msdyn_ExternalContextUploadTranscriptBlocks action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocexternalcontext)
 */
export class msdyn_ExternalContextUploadTranscriptBlocksAction implements Executable<msdyn_ExternalContextUploadTranscriptBlocksResponse> {
  constructor(
    public readonly msdyn_ocexternalcontextId: string,
    public readonly fileContinuationToken: string,
    public readonly transcript: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocexternalcontexts(${this.msdyn_ocexternalcontextId})/Microsoft.Dynamics.CRM.msdyn_ExternalContextUploadTranscriptBlocks`;

    const body: Record<string, unknown> = {
      FileContinuationToken: this.fileContinuationToken,
      Transcript: this.transcript,
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
  ): Promise<msdyn_ExternalContextUploadTranscriptBlocksResponse> {
    const data = await response.json();
    return data as msdyn_ExternalContextUploadTranscriptBlocksResponse;
  }
}
