import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_GetAllCjoEventsMetadataItems action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdynmkt_GetAllCjoEventsMetadataItemsResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: msdynmkt_GetAllCjoEventsMetadataItemsResponse })
      .value;
  }
}
