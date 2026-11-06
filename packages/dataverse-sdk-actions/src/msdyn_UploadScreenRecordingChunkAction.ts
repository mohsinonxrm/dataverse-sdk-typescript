import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UploadScreenRecordingChunk action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UploadScreenRecordingChunkResponse {
  "@odata.context"?: string;
  IsComplete: boolean;
  ResponseData: string;
  Status: string;
}

/**
 * Parameters of the msdyn_UploadScreenRecordingChunk action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UploadScreenRecordingChunkActionParameters {
  RequestData: string;
}

/**
 * msdyn_UploadScreenRecordingChunk action
 *
 * Unbound action
 */
export class msdyn_UploadScreenRecordingChunkAction implements Executable<msdyn_UploadScreenRecordingChunkResponse> {
  constructor(public readonly parameters: msdyn_UploadScreenRecordingChunkActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UploadScreenRecordingChunk`;

    const body = requestBody({
      RequestData: this.parameters.RequestData,
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
    return (await response.json()) as msdyn_UploadScreenRecordingChunkResponse;
  }
}
