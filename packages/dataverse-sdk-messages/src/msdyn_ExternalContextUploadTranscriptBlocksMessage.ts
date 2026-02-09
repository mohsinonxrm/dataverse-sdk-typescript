import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ExternalContextUploadTranscriptBlocks request message
 *
 * Web API Action: msdyn_ExternalContextUploadTranscriptBlocks
 */
export class msdyn_ExternalContextUploadTranscriptBlocksRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExternalContextUploadTranscriptBlocksResponse>
{
  constructor(
    public msdyn_ocexternalcontextId: string,
    public fileContinuationToken: string,
    public transcript: string
  ) {
    super("msdyn_ExternalContextUploadTranscriptBlocks");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_ExternalContextUploadTranscriptBlocksResponse> {
    const data = await response.json();
    return msdyn_ExternalContextUploadTranscriptBlocksResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocexternalcontextId,
      FileContinuationToken: this.fileContinuationToken,
      Transcript: this.transcript,
    };
  }
}

/**
 * msdyn_ExternalContextUploadTranscriptBlocks response message
 */
export class msdyn_ExternalContextUploadTranscriptBlocksResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExternalContextUploadTranscriptBlocksResponse) {
    super("msdyn_ExternalContextUploadTranscriptBlocks");
  }

  static fromResponse(data: unknown): msdyn_ExternalContextUploadTranscriptBlocksResponse {
    return new msdyn_ExternalContextUploadTranscriptBlocksResponse((data as any).value);
  }
}
