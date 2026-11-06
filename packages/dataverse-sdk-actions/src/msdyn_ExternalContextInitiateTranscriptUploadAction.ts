import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ExternalContextInitiateTranscriptUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExternalContextInitiateTranscriptUploadResponse {
  "@odata.context"?: string;
  BlockList: string[];
  FileContinuationToken: string;
}

/**
 * Parameters of the msdyn_ExternalContextInitiateTranscriptUpload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExternalContextInitiateTranscriptUploadActionParameters {
  Transcript: string;
}

/**
 * msdyn_ExternalContextInitiateTranscriptUpload action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocexternalcontext)
 *
 * The first argument is the id of the msdyn_ocexternalcontext record to call it on.
 */
export class msdyn_ExternalContextInitiateTranscriptUploadAction implements Executable<msdyn_ExternalContextInitiateTranscriptUploadResponse> {
  constructor(
    public readonly msdyn_ocexternalcontextId: string,
    public readonly parameters: msdyn_ExternalContextInitiateTranscriptUploadActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocexternalcontexts(${this.msdyn_ocexternalcontextId})/Microsoft.Dynamics.CRM.msdyn_ExternalContextInitiateTranscriptUpload`;

    const body = requestBody({
      Transcript: this.parameters.Transcript,
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
    return (await response.json()) as msdyn_ExternalContextInitiateTranscriptUploadResponse;
  }
}
