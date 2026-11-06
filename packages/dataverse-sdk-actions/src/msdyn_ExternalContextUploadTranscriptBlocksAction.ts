import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ExternalContextUploadTranscriptBlocks action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExternalContextUploadTranscriptBlocksResponse {
  "@odata.context"?: string;
  BlockList: string[];
}

/**
 * Parameters of the msdyn_ExternalContextUploadTranscriptBlocks action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExternalContextUploadTranscriptBlocksActionParameters {
  Transcript: string;
  FileContinuationToken: string;
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
      Transcript: this.parameters.Transcript,
      FileContinuationToken: this.parameters.FileContinuationToken,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ExternalContextUploadTranscriptBlocksResponse;
  }
}
