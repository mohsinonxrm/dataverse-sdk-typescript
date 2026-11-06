import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_ExternalContextInitiateTranscriptUploadResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_ExternalContextInitiateTranscriptUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExternalContextInitiateTranscriptUploadResult {
  "@odata.context"?: string;
  BlockList: string[];
  FileContinuationToken: string;
}

/**
 * msdyn_ExternalContextInitiateTranscriptUpload response message
 *
 * `result` is the value the msdyn_ExternalContextInitiateTranscriptUpload action returns (see {@link msdyn_ExternalContextInitiateTranscriptUploadResult}).
 */
export class msdyn_ExternalContextInitiateTranscriptUploadResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExternalContextInitiateTranscriptUploadResult) {
    super("msdyn_ExternalContextInitiateTranscriptUpload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExternalContextInitiateTranscriptUploadResponse {
    return new msdyn_ExternalContextInitiateTranscriptUploadResponse(
      data as msdyn_ExternalContextInitiateTranscriptUploadResult
    );
  }
}
