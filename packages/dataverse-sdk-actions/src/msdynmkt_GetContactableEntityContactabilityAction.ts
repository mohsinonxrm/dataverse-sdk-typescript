import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_GetContactableEntityContactability action
 */
export interface msdynmkt_GetContactableEntityContactabilityResponse {
  ContactPointsFound: number;
  ContactabilityResult: string;
  SendablePurposeCount: number;
  SendableTopicCount: number;
}

/**
 * Parameters of the msdynmkt_GetContactableEntityContactability action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetContactableEntityContactabilityActionParameters {
  ComplianceSettingsIds?: string[];
  ChannelTypes?: string[];
  CorrelationId?: string;
  EntityId: string;
  EntityName: string;
}

/**
 * msdynmkt_GetContactableEntityContactability action
 *
 * Unbound action
 */
export class msdynmkt_GetContactableEntityContactabilityAction implements Executable<msdynmkt_GetContactableEntityContactabilityResponse> {
  constructor(
    public readonly parameters: msdynmkt_GetContactableEntityContactabilityActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetContactableEntityContactability`;

    const body = requestBody({
      ComplianceSettingsIds: this.parameters.ComplianceSettingsIds,
      ChannelTypes: this.parameters.ChannelTypes,
      CorrelationId: this.parameters.CorrelationId,
      EntityId: this.parameters.EntityId,
      EntityName: this.parameters.EntityName,
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
    if (response.status === 204) return {} as msdynmkt_GetContactableEntityContactabilityResponse;
    return (await response.json()) as msdynmkt_GetContactableEntityContactabilityResponse;
  }
}
