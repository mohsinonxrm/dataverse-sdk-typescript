import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ScreenRecordingRedactionResponse as msdyn_ScreenRecordingRedactionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ScreenRecordingRedactionResponse.fromResponse({});
    return msdyn_ScreenRecordingRedactionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ScreenRecordingRedaction response message
 */
export class msdyn_ScreenRecordingRedactionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ScreenRecordingRedactionResponseData) {
    super("msdyn_ScreenRecordingRedaction");
  }

  static fromResponse(data: unknown): msdyn_ScreenRecordingRedactionResponse {
    return new msdyn_ScreenRecordingRedactionResponse(
      responseObject<msdyn_ScreenRecordingRedactionResponseData>(data)
    );
  }
}
