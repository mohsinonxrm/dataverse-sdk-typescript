import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_GetAllCjoEventsMetadataItems action
 */
export interface msdynmkt_GetAllCjoEventsMetadataItemsResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdynmkt_GetAllCjoEventsMetadataItems action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetAllCjoEventsMetadataItemsActionParameters {
  msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode?: number;
}

/**
 * msdynmkt_GetAllCjoEventsMetadataItems action
 *
 * Unbound action
 */
export class msdynmkt_GetAllCjoEventsMetadataItemsAction implements Executable<msdynmkt_GetAllCjoEventsMetadataItemsResponse> {
  constructor(
    public readonly parameters: msdynmkt_GetAllCjoEventsMetadataItemsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetAllCjoEventsMetadataItems`;

    const body = requestBody({
      msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode:
        this.parameters.msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode,
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

  async parseResponse(response: Response): Promise<msdynmkt_GetAllCjoEventsMetadataItemsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_GetAllCjoEventsMetadataItemsResponse;
  }
}
