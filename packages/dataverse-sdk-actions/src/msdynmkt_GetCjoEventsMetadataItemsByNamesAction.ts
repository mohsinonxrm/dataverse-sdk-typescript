import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdynmkt_GetCjoEventsMetadataItemsByNames action
 */
export interface msdynmkt_GetCjoEventsMetadataItemsByNamesResponse {
  value: EntityReference[];
}

/**
 * msdynmkt_GetCjoEventsMetadataItemsByNames action
 *
 * Unbound action
 */
export class msdynmkt_GetCjoEventsMetadataItemsByNamesAction implements Executable<msdynmkt_GetCjoEventsMetadataItemsByNamesResponse> {
  constructor(
    public readonly msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode: number,
    public readonly msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetCjoEventsMetadataItemsByNames`;

    const body: Record<string, unknown> = {
      msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode:
        this.msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode,
      msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames:
        this.msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames,
    };

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
    const data = await response.json();
    return data as msdynmkt_GetCjoEventsMetadataItemsByNamesResponse;
  }
}
