import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UploadScreenRecordingChunkResponse as msdyn_UploadScreenRecordingChunkResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_UploadScreenRecordingChunkResponse.fromResponse({});
    return msdyn_UploadScreenRecordingChunkResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_UploadScreenRecordingChunk response message
 */
export class msdyn_UploadScreenRecordingChunkResponse extends OrganizationResponse {
  constructor(public result: msdyn_UploadScreenRecordingChunkResponseData) {
    super("msdyn_UploadScreenRecordingChunk");
  }

  static fromResponse(data: unknown): msdyn_UploadScreenRecordingChunkResponse {
    return new msdyn_UploadScreenRecordingChunkResponse(
      responseObject<msdyn_UploadScreenRecordingChunkResponseData>(data)
    );
  }
}
