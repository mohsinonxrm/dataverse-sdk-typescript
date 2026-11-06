import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ExternalContextUploadTranscriptBlocksResponse as msdyn_ExternalContextUploadTranscriptBlocksResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ExternalContextUploadTranscriptBlocks message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExternalContextUploadTranscriptBlocksRequestParameters {
  FileContinuationToken: string;
  Transcript: string;
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
      FileContinuationToken: this.Parameters.FileContinuationToken,
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
  ): Promise<msdyn_ExternalContextUploadTranscriptBlocksResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ExternalContextUploadTranscriptBlocksResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_ExternalContextUploadTranscriptBlocks response message
 */
export class msdyn_ExternalContextUploadTranscriptBlocksResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExternalContextUploadTranscriptBlocksResponseData) {
    super("msdyn_ExternalContextUploadTranscriptBlocks");
  }

  static fromResponse(data: unknown): msdyn_ExternalContextUploadTranscriptBlocksResponse {
    return new msdyn_ExternalContextUploadTranscriptBlocksResponse(
      responseObject<msdyn_ExternalContextUploadTranscriptBlocksResponseData>(data)
    );
  }
}
