import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_ProcessDescriptionPublishChunkResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ProcessDescriptionPublishChunk action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProcessDescriptionPublishChunkResult {
  "@odata.context"?: string;
  msdyn_FailedCount: number;
  msdyn_HasMoreRecords: boolean;
  msdyn_PublishedCount: number;
}

/**
 * msdyn_ProcessDescriptionPublishChunk response message
 *
 * `result` is the value the msdyn_ProcessDescriptionPublishChunk action returns (see {@link msdyn_ProcessDescriptionPublishChunkResult}).
 */
export class msdyn_ProcessDescriptionPublishChunkResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProcessDescriptionPublishChunkResult) {
    super("msdyn_ProcessDescriptionPublishChunk");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ProcessDescriptionPublishChunkResponse {
    return new msdyn_ProcessDescriptionPublishChunkResponse(
      data as msdyn_ProcessDescriptionPublishChunkResult
    );
  }
}
