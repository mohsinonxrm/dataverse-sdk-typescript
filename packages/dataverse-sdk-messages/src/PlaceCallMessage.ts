import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { PlaceCallResponse as PlaceCallResponseData } from "./types/index.js";

/**
 * Parameters of the PlaceCall message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PlaceCallRequestParameters {
  ApiVersion: string;
  DestinationNumber: string;
}

/**
 * PlaceCall request message
 *
 * Web API Action: PlaceCall
 */
export class PlaceCallRequest extends OrganizationRequest implements Executable<PlaceCallResponse> {
  declare readonly Parameters: Readonly<PlaceCallRequestParameters>;

  constructor(parameters: PlaceCallRequestParameters) {
    super("PlaceCall", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PlaceCall`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      DestinationNumber: this.Parameters.DestinationNumber,
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

  async parseResponse(response: Response): Promise<PlaceCallResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return PlaceCallResponse.fromResponse({});
    return PlaceCallResponse.fromResponse(await response.json());
  }
}

/**
 * PlaceCall response message
 */
export class PlaceCallResponse extends OrganizationResponse {
  constructor(public result: PlaceCallResponseData) {
    super("PlaceCall");
  }

  static fromResponse(data: unknown): PlaceCallResponse {
    return new PlaceCallResponse(responseObject<PlaceCallResponseData>(data));
  }
}
