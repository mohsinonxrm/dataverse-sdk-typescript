import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse as msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse.fromResponse({});
    return msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdynmkt_UnsubscribeContactableEntityFromAllCommunication response message
 */
export class msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse extends OrganizationResponse {
  constructor(
    public result: msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponseData
  ) {
    super("msdynmkt_UnsubscribeContactableEntityFromAllCommunication");
  }

  static fromResponse(
    data: unknown
  ): msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse {
    return new msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponse(
      responseObject<msdynmkt_UnsubscribeContactableEntityFromAllCommunicationResponseData>(data)
    );
  }
}
