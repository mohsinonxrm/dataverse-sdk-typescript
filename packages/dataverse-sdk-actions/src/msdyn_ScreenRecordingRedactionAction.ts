import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ScreenRecordingRedaction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ScreenRecordingRedactionResponse {
  "@odata.context"?: string;
  ResponseData: string;
}

/**
 * Parameters of the msdyn_ScreenRecordingRedaction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ScreenRecordingRedactionActionParameters {
  RequestData: string;
}

/**
 * msdyn_ScreenRecordingRedaction action
 *
 * Unbound action
 */
export class msdyn_ScreenRecordingRedactionAction implements Executable<msdyn_ScreenRecordingRedactionResponse> {
  constructor(public readonly parameters: msdyn_ScreenRecordingRedactionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ScreenRecordingRedaction`;

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

  async parseResponse(response: Response): Promise<msdyn_ScreenRecordingRedactionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ScreenRecordingRedactionResponse;
  }
}
