import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the PlaceCall action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PlaceCallResponse {
  "@odata.context"?: string;
  CallConnectionId: string;
  ConversationId: string;
  InternalSessionId: string;
  TestSessionId: string;
  Timestamp: string;
}

/**
 * Parameters of the PlaceCall action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PlaceCallActionParameters {
  ApiVersion: string;
  DestinationNumber: string;
}

/**
 * PlaceCall action
 *
 * Unbound action
 */
export class PlaceCallAction implements Executable<PlaceCallResponse> {
  constructor(public readonly parameters: PlaceCallActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PlaceCall`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      DestinationNumber: this.parameters.DestinationNumber,
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
    return (await response.json()) as PlaceCallResponse;
  }
}
