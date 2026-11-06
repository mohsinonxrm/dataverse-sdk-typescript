import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdynmkt_GetContactableEntityContactabilityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_GetContactableEntityContactability action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_GetContactableEntityContactabilityResult {
  "@odata.context"?: string;
  ContactPointsFound: number;
  ContactabilityResult: string;
  SendablePurposeCount: number;
  SendableTopicCount: number;
}

/**
 * msdynmkt_GetContactableEntityContactability response message
 *
 * `result` is the value the msdynmkt_GetContactableEntityContactability action returns (see {@link msdynmkt_GetContactableEntityContactabilityResult}).
 */
export class msdynmkt_GetContactableEntityContactabilityResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_GetContactableEntityContactabilityResult) {
    super("msdynmkt_GetContactableEntityContactability");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_GetContactableEntityContactabilityResponse {
    return new msdynmkt_GetContactableEntityContactabilityResponse(
      data as msdynmkt_GetContactableEntityContactabilityResult
    );
  }
}
