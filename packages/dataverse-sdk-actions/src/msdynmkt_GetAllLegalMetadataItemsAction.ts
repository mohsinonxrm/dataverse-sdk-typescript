import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_GetAllLegalMetadataItems action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdynmkt_GetAllLegalMetadataItemsResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the msdynmkt_GetAllLegalMetadataItems action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetAllLegalMetadataItemsActionParameters {
  msdynmkt_GetAllLegalMetadataItems_request_LanguageCode?: number;
}

/**
 * msdynmkt_GetAllLegalMetadataItems action
 *
 * Unbound action
 */
export class msdynmkt_GetAllLegalMetadataItemsAction implements Executable<msdynmkt_GetAllLegalMetadataItemsResponse> {
  constructor(public readonly parameters: msdynmkt_GetAllLegalMetadataItemsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetAllLegalMetadataItems`;

    const body = requestBody({
      msdynmkt_GetAllLegalMetadataItems_request_LanguageCode:
        this.parameters.msdynmkt_GetAllLegalMetadataItems_request_LanguageCode,
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

  async parseResponse(response: Response): Promise<msdynmkt_GetAllLegalMetadataItemsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: msdynmkt_GetAllLegalMetadataItemsResponse }).value;
  }
}
