import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UploadScreenRecordingChunk message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UploadScreenRecordingChunkRequestParameters {
  RequestData: string;
}

/**
 * msdyn_UploadScreenRecordingChunk request message
 *
 * Web API Action: msdyn_UploadScreenRecordingChunk
 */
export class msdyn_UploadScreenRecordingChunkRequest
  extends OrganizationRequest
  implements Executable<msdyn_UploadScreenRecordingChunkResponse>
{
  declare readonly Parameters: Readonly<msdyn_UploadScreenRecordingChunkRequestParameters>;

  constructor(parameters: msdyn_UploadScreenRecordingChunkRequestParameters) {
    super("msdyn_UploadScreenRecordingChunk", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UploadScreenRecordingChunk`;

    const body = requestBody({
      RequestData: this.Parameters.RequestData,
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

  async parseResponse(response: Response): Promise<msdyn_UploadScreenRecordingChunkResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_UploadScreenRecordingChunkResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UploadScreenRecordingChunk action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UploadScreenRecordingChunkResult {
  "@odata.context"?: string;
  IsComplete: boolean;
  ResponseData: string;
  Status: string;
}

/**
 * msdyn_UploadScreenRecordingChunk response message
 *
 * `result` is the value the msdyn_UploadScreenRecordingChunk action returns (see {@link msdyn_UploadScreenRecordingChunkResult}).
 */
export class msdyn_UploadScreenRecordingChunkResponse extends OrganizationResponse {
  constructor(public result: msdyn_UploadScreenRecordingChunkResult) {
    super("msdyn_UploadScreenRecordingChunk");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UploadScreenRecordingChunkResponse {
    return new msdyn_UploadScreenRecordingChunkResponse(
      data as msdyn_UploadScreenRecordingChunkResult
    );
  }
}
