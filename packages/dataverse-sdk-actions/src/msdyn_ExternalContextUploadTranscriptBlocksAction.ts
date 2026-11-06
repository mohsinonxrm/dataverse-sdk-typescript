import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ExternalContextUploadTranscriptBlocks action
 */
export interface msdyn_ExternalContextUploadTranscriptBlocksResponse {
  BlockList: string[];
}

/**
 * Parameters of the msdyn_ExternalContextUploadTranscriptBlocks action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExternalContextUploadTranscriptBlocksActionParameters {
  FileContinuationToken: string;
  Transcript: string;
}

/**
 * msdyn_ExternalContextUploadTranscriptBlocks action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocexternalcontext)
 *
 * The first argument is the id of the msdyn_ocexternalcontext record to call it on.
 */
export class msdyn_ExternalContextUploadTranscriptBlocksAction implements Executable<msdyn_ExternalContextUploadTranscriptBlocksResponse> {
  constructor(
    public readonly msdyn_ocexternalcontextId: string,
    public readonly parameters: msdyn_ExternalContextUploadTranscriptBlocksActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocexternalcontexts(${this.msdyn_ocexternalcontextId})/Microsoft.Dynamics.CRM.msdyn_ExternalContextUploadTranscriptBlocks`;

    const body = requestBody({
      FileContinuationToken: this.parameters.FileContinuationToken,
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
  ): Promise<msdyn_ExternalContextUploadTranscriptBlocksResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ExternalContextUploadTranscriptBlocksResponse;
  }
}
