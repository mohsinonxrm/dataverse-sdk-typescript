import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ScreenRecordingRedaction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ScreenRecordingRedactionRequestParameters {
  RequestData: string;
}

/**
 * msdyn_ScreenRecordingRedaction request message
 *
 * Web API Action: msdyn_ScreenRecordingRedaction
 */
export class msdyn_ScreenRecordingRedactionRequest
  extends OrganizationRequest
  implements Executable<msdyn_ScreenRecordingRedactionResponse>
{
  declare readonly Parameters: Readonly<msdyn_ScreenRecordingRedactionRequestParameters>;

  constructor(parameters: msdyn_ScreenRecordingRedactionRequestParameters) {
    super("msdyn_ScreenRecordingRedaction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ScreenRecordingRedaction`;

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

  async parseResponse(response: Response): Promise<msdyn_ScreenRecordingRedactionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ScreenRecordingRedactionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ScreenRecordingRedaction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ScreenRecordingRedactionResult {
  "@odata.context"?: string;
  ResponseData: string;
}

/**
 * msdyn_ScreenRecordingRedaction response message
 *
 * `result` is the value the msdyn_ScreenRecordingRedaction action returns (see {@link msdyn_ScreenRecordingRedactionResult}).
 */
export class msdyn_ScreenRecordingRedactionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ScreenRecordingRedactionResult) {
    super("msdyn_ScreenRecordingRedaction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ScreenRecordingRedactionResponse {
    return new msdyn_ScreenRecordingRedactionResponse(data as msdyn_ScreenRecordingRedactionResult);
  }
}
