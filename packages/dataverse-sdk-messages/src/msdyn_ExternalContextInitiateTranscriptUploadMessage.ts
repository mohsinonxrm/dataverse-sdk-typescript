import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ExternalContextInitiateTranscriptUploadResponse as msdyn_ExternalContextInitiateTranscriptUploadResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ExternalContextInitiateTranscriptUpload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExternalContextInitiateTranscriptUploadRequestParameters {
  Transcript: string;
}

/**
 * msdyn_ExternalContextInitiateTranscriptUpload request message
 *
 * Web API Action: msdyn_ExternalContextInitiateTranscriptUpload
 *
 * The first argument is the id of the msdyn_ocexternalcontext record to call it on.
 */
export class msdyn_ExternalContextInitiateTranscriptUploadRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExternalContextInitiateTranscriptUploadResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExternalContextInitiateTranscriptUploadRequestParameters>;

  constructor(
    public msdyn_ocexternalcontextId: string,
    parameters: msdyn_ExternalContextInitiateTranscriptUploadRequestParameters
  ) {
    super("msdyn_ExternalContextInitiateTranscriptUpload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocexternalcontexts(${this.msdyn_ocexternalcontextId})/Microsoft.Dynamics.CRM.msdyn_ExternalContextInitiateTranscriptUpload`;

    const body = requestBody({
      Transcript: this.Parameters.Transcript,
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
  ): Promise<msdyn_ExternalContextInitiateTranscriptUploadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_ExternalContextInitiateTranscriptUploadResponse.fromResponse({});
    return msdyn_ExternalContextInitiateTranscriptUploadResponse.fromResponse(
      await response.json()
    );
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
