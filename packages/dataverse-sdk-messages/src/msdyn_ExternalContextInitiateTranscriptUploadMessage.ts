import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ExternalContextInitiateTranscriptUploadResponse as msdyn_ExternalContextInitiateTranscriptUploadResponseData } from "./types/index.js";

/**
 * msdyn_ExternalContextInitiateTranscriptUpload request message
 *
 * Web API Action: msdyn_ExternalContextInitiateTranscriptUpload
 */
export class msdyn_ExternalContextInitiateTranscriptUploadRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExternalContextInitiateTranscriptUploadResponse>
{
  constructor(
    public msdyn_ocexternalcontextId: string,
    public transcript: string
  ) {
    super("msdyn_ExternalContextInitiateTranscriptUpload");
  }

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
    return msdyn_ExternalContextInitiateTranscriptUploadResponse.fromResponse(data);
  }
}

/**
 * msdyn_ExternalContextInitiateTranscriptUpload response message
 */
export class msdyn_ExternalContextInitiateTranscriptUploadResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExternalContextInitiateTranscriptUploadResponseData) {
    super("msdyn_ExternalContextInitiateTranscriptUpload");
  }

  static fromResponse(data: unknown): msdyn_ExternalContextInitiateTranscriptUploadResponse {
    return new msdyn_ExternalContextInitiateTranscriptUploadResponse(
      responseObject<msdyn_ExternalContextInitiateTranscriptUploadResponseData>(data)
    );
  }
}
