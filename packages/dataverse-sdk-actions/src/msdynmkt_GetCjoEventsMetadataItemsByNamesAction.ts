import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_GetCjoEventsMetadataItemsByNames action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdynmkt_GetCjoEventsMetadataItemsByNamesResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: msdynmkt_GetCjoEventsMetadataItemsByNamesResponse })
      .value;
  }
}
