import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ExternalContextUploadTranscriptBlocks message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExternalContextUploadTranscriptBlocksRequestParameters {
  Transcript: string;
  FileContinuationToken: string;
}

/**
 * msdyn_ExternalContextUploadTranscriptBlocks request message
 *
 * Web API Action: msdyn_ExternalContextUploadTranscriptBlocks
 *
 * The first argument is the id of the msdyn_ocexternalcontext record to call it on.
 */
export class msdyn_ExternalContextUploadTranscriptBlocksRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExternalContextUploadTranscriptBlocksResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExternalContextUploadTranscriptBlocksRequestParameters>;

  constructor(
    public msdyn_ocexternalcontextId: string,
    parameters: msdyn_ExternalContextUploadTranscriptBlocksRequestParameters
  ) {
    super("msdyn_ExternalContextUploadTranscriptBlocks", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocexternalcontexts(${this.msdyn_ocexternalcontextId})/Microsoft.Dynamics.CRM.msdyn_ExternalContextUploadTranscriptBlocks`;

    const body = requestBody({
      Transcript: this.Parameters.Transcript,
      FileContinuationToken: this.Parameters.FileContinuationToken,
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
    return msdyn_ExternalContextUploadTranscriptBlocksResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExternalContextUploadTranscriptBlocks action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExternalContextUploadTranscriptBlocksResult {
  "@odata.context"?: string;
  BlockList: string[];
}

/**
 * msdyn_ExternalContextUploadTranscriptBlocks response message
 *
 * `result` is the value the msdyn_ExternalContextUploadTranscriptBlocks action returns (see {@link msdyn_ExternalContextUploadTranscriptBlocksResult}).
 */
export class msdyn_ExternalContextUploadTranscriptBlocksResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExternalContextUploadTranscriptBlocksResult) {
    super("msdyn_ExternalContextUploadTranscriptBlocks");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExternalContextUploadTranscriptBlocksResponse {
    return new msdyn_ExternalContextUploadTranscriptBlocksResponse(
      data as msdyn_ExternalContextUploadTranscriptBlocksResult
    );
  }
}
