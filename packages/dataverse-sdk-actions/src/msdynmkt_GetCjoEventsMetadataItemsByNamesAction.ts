import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_GetCjoEventsMetadataItemsByNames action
 */
export interface msdynmkt_GetCjoEventsMetadataItemsByNamesResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdynmkt_GetCjoEventsMetadataItemsByNames action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetCjoEventsMetadataItemsByNamesActionParameters {
  msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode?: number;
  msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames: string[];
}

/**
 * msdynmkt_GetCjoEventsMetadataItemsByNames action
 *
 * Unbound action
 */
export class msdynmkt_GetCjoEventsMetadataItemsByNamesAction implements Executable<msdynmkt_GetCjoEventsMetadataItemsByNamesResponse> {
  constructor(
    public readonly parameters: msdynmkt_GetCjoEventsMetadataItemsByNamesActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetCjoEventsMetadataItemsByNames`;

    const body = requestBody({
      msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode:
        this.parameters.msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode,
      msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames:
        this.parameters.msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames,
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
  ): Promise<msdynmkt_GetCjoEventsMetadataItemsByNamesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_GetCjoEventsMetadataItemsByNamesResponse;
  }
}
