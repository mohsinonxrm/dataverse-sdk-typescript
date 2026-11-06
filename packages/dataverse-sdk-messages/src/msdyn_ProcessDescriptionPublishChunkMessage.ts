import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ProcessDescriptionPublishChunkResponse as msdyn_ProcessDescriptionPublishChunkResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ProcessDescriptionPublishChunk message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProcessDescriptionPublishChunkRequestParameters {
  msdyn_CorrelationId: string;
  msdyn_RunId: string;
  msdyn_PublishJobId: string;
  msdyn_TargetAttributeName: string;
}

/**
 * msdyn_ProcessDescriptionPublishChunk request message
 *
 * Web API Action: msdyn_ProcessDescriptionPublishChunk
 */
export class msdyn_ProcessDescriptionPublishChunkRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProcessDescriptionPublishChunkResponse>
{
  declare readonly Parameters: Readonly<msdyn_ProcessDescriptionPublishChunkRequestParameters>;

  constructor(parameters: msdyn_ProcessDescriptionPublishChunkRequestParameters) {
    super("msdyn_ProcessDescriptionPublishChunk", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProcessDescriptionPublishChunk`;

    const body = requestBody({
      msdyn_CorrelationId: this.Parameters.msdyn_CorrelationId,
      msdyn_RunId: this.Parameters.msdyn_RunId,
      msdyn_PublishJobId: this.Parameters.msdyn_PublishJobId,
      msdyn_TargetAttributeName: this.Parameters.msdyn_TargetAttributeName,
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

  async parseResponse(response: Response): Promise<msdyn_ProcessDescriptionPublishChunkResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_ProcessDescriptionPublishChunkResponse.fromResponse({});
    return msdyn_ProcessDescriptionPublishChunkResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ProcessDescriptionPublishChunk response message
 */
export class msdyn_ProcessDescriptionPublishChunkResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProcessDescriptionPublishChunkResponseData) {
    super("msdyn_ProcessDescriptionPublishChunk");
  }

  static fromResponse(data: unknown): msdyn_ProcessDescriptionPublishChunkResponse {
    return new msdyn_ProcessDescriptionPublishChunkResponse(
      responseObject<msdyn_ProcessDescriptionPublishChunkResponseData>(data)
    );
  }
}
