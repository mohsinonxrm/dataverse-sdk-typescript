import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_UnsubscribeContactableEntityFromAllCommunication message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_UnsubscribeContactableEntityFromAllCommunicationRequestParameters {
  EntityId: string;
  EntityName: string;
  CorrelationId?: string;
  ChannelTypes?: string[];
}

/**
 * msdynmkt_UnsubscribeContactableEntityFromAllCommunication request message
 *
 * Web API Action: msdynmkt_UnsubscribeContactableEntityFromAllCommunication
 */
export class msdynmkt_UnsubscribeContactableEntityFromAllCommunicationRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_UnsubscribeContactableEntityFromAllCommunicationRequestParameters>;

  constructor(
    parameters: msdynmkt_UnsubscribeContactableEntityFromAllCommunicationRequestParameters
  ) {
    super("msdynmkt_UnsubscribeContactableEntityFromAllCommunication", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_UnsubscribeContactableEntityFromAllCommunication`;

    const body = requestBody({
      EntityId: this.Parameters.EntityId,
      EntityName: this.Parameters.EntityName,
      CorrelationId: this.Parameters.CorrelationId,
      ChannelTypes: this.Parameters.ChannelTypes,
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
    return msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdynmkt_UnsubscribeContactableEntityFromAllCommunication action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResult {
  "@odata.context"?: string;
  ContactPointsFound: number;
  FailedContactPointCount: number;
  IsSuccess: boolean;
  OptedOutContactPointCount: number;
  UnsubscribeResult: string;
}

/**
 * msdynmkt_UnsubscribeContactableEntityFromAllCommunication response message
 *
 * `result` is the value the msdynmkt_UnsubscribeContactableEntityFromAllCommunication action returns (see {@link msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResult}).
 */
export class msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResult) {
    super("msdynmkt_UnsubscribeContactableEntityFromAllCommunication");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse {
    return new msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse(
      data as msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResult
    );
  }
}
