import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ExternalContextInitiateTranscriptUpload action
 */
export interface msdyn_ExternalContextInitiateTranscriptUploadResponse {
  BlockList: string[];
  FileContinuationToken: string;
}

/**
 * msdyn_ExternalContextInitiateTranscriptUpload action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocexternalcontext)
 */
export class msdyn_ExternalContextInitiateTranscriptUploadAction implements Executable<msdyn_ExternalContextInitiateTranscriptUploadResponse> {
  constructor(
    public readonly msdyn_ocexternalcontextId: string,
    public readonly transcript: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocexternalcontexts(${this.msdyn_ocexternalcontextId})/Microsoft.Dynamics.CRM.msdyn_ExternalContextInitiateTranscriptUpload`;

    const body: Record<string, unknown> = {
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
  ): Promise<msdyn_ExternalContextInitiateTranscriptUploadResponse> {
    const data = await response.json();
    return data as msdyn_ExternalContextInitiateTranscriptUploadResponse;
  }
}
