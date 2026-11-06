import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ProcessDescriptionPublishChunk action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProcessDescriptionPublishChunkResponse {
  "@odata.context"?: string;
  msdyn_FailedCount: number;
  msdyn_HasMoreRecords: boolean;
  msdyn_PublishedCount: number;
}

/**
 * Parameters of the msdyn_ProcessDescriptionPublishChunk action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProcessDescriptionPublishChunkActionParameters {
  msdyn_CorrelationId: string;
  msdyn_RunId: string;
  msdyn_PublishJobId: string;
  msdyn_TargetAttributeName: string;
}

/**
 * msdyn_ProcessDescriptionPublishChunk action
 *
 * Unbound action
 */
export class msdyn_ProcessDescriptionPublishChunkAction implements Executable<msdyn_ProcessDescriptionPublishChunkResponse> {
  constructor(public readonly parameters: msdyn_ProcessDescriptionPublishChunkActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProcessDescriptionPublishChunk`;

    const body = requestBody({
      msdyn_CorrelationId: this.parameters.msdyn_CorrelationId,
      msdyn_RunId: this.parameters.msdyn_RunId,
      msdyn_PublishJobId: this.parameters.msdyn_PublishJobId,
      msdyn_TargetAttributeName: this.parameters.msdyn_TargetAttributeName,
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
    return (await response.json()) as msdyn_ProcessDescriptionPublishChunkResponse;
  }
}
