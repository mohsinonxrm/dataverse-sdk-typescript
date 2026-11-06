import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return PlaceCallResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PlaceCall action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PlaceCallResult {
  "@odata.context"?: string;
  CallConnectionId: string;
  ConversationId: string;
  InternalSessionId: string;
  TestSessionId: string;
  Timestamp: string;
}

/**
 * PlaceCall response message
 *
 * `result` is the value the PlaceCall action returns (see {@link PlaceCallResult}).
 */
export class PlaceCallResponse extends OrganizationResponse {
  constructor(public result: PlaceCallResult) {
    super("PlaceCall");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PlaceCallResponse {
    return new PlaceCallResponse(data as PlaceCallResult);
  }
}
