import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_UnsubscribeContactableEntityFromAllCommunication action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse {
  "@odata.context"?: string;
  ContactPointsFound: number;
  FailedContactPointCount: number;
  IsSuccess: boolean;
  OptedOutContactPointCount: number;
  UnsubscribeResult: string;
}

/**
 * Parameters of the msdynmkt_UnsubscribeContactableEntityFromAllCommunication action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_UnsubscribeContactableEntityFromAllCommunicationActionParameters {
  EntityId: string;
  EntityName: string;
  CorrelationId?: string;
  ChannelTypes?: string[];
}

/**
 * msdynmkt_UnsubscribeContactableEntityFromAllCommunication action
 *
 * Unbound action
 */
export class msdynmkt_UnsubscribeContactableEntityFromAllCommunicationAction implements Executable<msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse> {
  constructor(
    public readonly parameters: msdynmkt_UnsubscribeContactableEntityFromAllCommunicationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_UnsubscribeContactableEntityFromAllCommunication`;

    const body = requestBody({
      EntityId: this.parameters.EntityId,
      EntityName: this.parameters.EntityName,
      CorrelationId: this.parameters.CorrelationId,
      ChannelTypes: this.parameters.ChannelTypes,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse;
  }
}
