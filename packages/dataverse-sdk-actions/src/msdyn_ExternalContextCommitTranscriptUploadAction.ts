import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ExternalContextCommitTranscriptUpload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExternalContextCommitTranscriptUploadResponse {
  "@odata.context"?: string;
  FileId: string;
}

/**
 * Parameters of the msdyn_ExternalContextCommitTranscriptUpload action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExternalContextCommitTranscriptUploadActionParameters {
  FileContinuationToken: string;
  BlockList: string[];
}

/**
 * msdyn_ExternalContextCommitTranscriptUpload action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocexternalcontext)
 *
 * The first argument is the id of the msdyn_ocexternalcontext record to call it on.
 */
export class msdyn_ExternalContextCommitTranscriptUploadAction implements Executable<msdyn_ExternalContextCommitTranscriptUploadResponse> {
  constructor(
    public readonly msdyn_ocexternalcontextId: string,
    public readonly parameters: msdyn_ExternalContextCommitTranscriptUploadActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocexternalcontexts(${this.msdyn_ocexternalcontextId})/Microsoft.Dynamics.CRM.msdyn_ExternalContextCommitTranscriptUpload`;

    const body = requestBody({
      FileContinuationToken: this.parameters.FileContinuationToken,
      BlockList: this.parameters.BlockList,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ExternalContextCommitTranscriptUploadResponse;
  }
}
