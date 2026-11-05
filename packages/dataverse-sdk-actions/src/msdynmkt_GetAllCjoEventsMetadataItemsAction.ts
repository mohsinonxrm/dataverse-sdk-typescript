import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdynmkt_GetAllCjoEventsMetadataItems action
 */
export interface msdynmkt_GetAllCjoEventsMetadataItemsResponse {
  value: EntityReference[];
}

/**
 * msdynmkt_GetAllCjoEventsMetadataItems action
 *
 * Unbound action
 */
export class msdynmkt_GetAllCjoEventsMetadataItemsAction implements Executable<msdynmkt_GetAllCjoEventsMetadataItemsResponse> {
  constructor(public readonly msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetAllCjoEventsMetadataItems`;

    const body: Record<string, unknown> = {
      msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode:
        this.msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode,
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

  async parseResponse(response: Response): Promise<msdynmkt_GetAllCjoEventsMetadataItemsResponse> {
    const data = await response.json();
    return data as msdynmkt_GetAllCjoEventsMetadataItemsResponse;
  }
}
