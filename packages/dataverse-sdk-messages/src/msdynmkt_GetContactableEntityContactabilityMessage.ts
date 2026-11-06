import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_GetContactableEntityContactabilityResponse as msdynmkt_GetContactableEntityContactabilityResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_GetContactableEntityContactability message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetContactableEntityContactabilityRequestParameters {
  ComplianceSettingsIds?: string[];
  ChannelTypes?: string[];
  CorrelationId?: string;
  EntityId: string;
  EntityName: string;
}

/**
 * msdynmkt_GetContactableEntityContactability request message
 *
 * Web API Action: msdynmkt_GetContactableEntityContactability
 */
export class msdynmkt_GetContactableEntityContactabilityRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetContactableEntityContactabilityResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_GetContactableEntityContactabilityRequestParameters>;

  constructor(parameters: msdynmkt_GetContactableEntityContactabilityRequestParameters) {
    super("msdynmkt_GetContactableEntityContactability", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetContactableEntityContactability`;

    const body = requestBody({
      ComplianceSettingsIds: this.Parameters.ComplianceSettingsIds,
      ChannelTypes: this.Parameters.ChannelTypes,
      CorrelationId: this.Parameters.CorrelationId,
      EntityId: this.Parameters.EntityId,
      EntityName: this.Parameters.EntityName,
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
  ): Promise<msdynmkt_GetContactableEntityContactabilityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_GetContactableEntityContactabilityResponse.fromResponse({});
    return msdynmkt_GetContactableEntityContactabilityResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_GetContactableEntityContactability response message
 */
export class msdynmkt_GetContactableEntityContactabilityResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_GetContactableEntityContactabilityResponseData) {
    super("msdynmkt_GetContactableEntityContactability");
  }

  static fromResponse(data: unknown): msdynmkt_GetContactableEntityContactabilityResponse {
    return new msdynmkt_GetContactableEntityContactabilityResponse(
      responseObject<msdynmkt_GetContactableEntityContactabilityResponseData>(data)
    );
  }
}
