import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_GetAllCjoEventsMetadataItems message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetAllCjoEventsMetadataItemsRequestParameters {
  msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode?: number;
}

/**
 * msdynmkt_GetAllCjoEventsMetadataItems request message
 *
 * Web API Action: msdynmkt_GetAllCjoEventsMetadataItems
 */
export class msdynmkt_GetAllCjoEventsMetadataItemsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetAllCjoEventsMetadataItemsResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_GetAllCjoEventsMetadataItemsRequestParameters>;

  constructor(parameters: msdynmkt_GetAllCjoEventsMetadataItemsRequestParameters = {}) {
    super("msdynmkt_GetAllCjoEventsMetadataItems", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetAllCjoEventsMetadataItems`;

    const body = requestBody({
      msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode:
        this.Parameters.msdynmkt_GetAllCjoEventsMetadataItems_request_LanguageCode,
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
    if (response.status === 204)
      return msdynmkt_GetAllCjoEventsMetadataItemsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdynmkt_GetAllCjoEventsMetadataItemsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_GetAllCjoEventsMetadataItems action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdynmkt_GetAllCjoEventsMetadataItemsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdynmkt_GetAllCjoEventsMetadataItems response message
 *
 * `result` is the value the msdynmkt_GetAllCjoEventsMetadataItems action returns (see {@link msdynmkt_GetAllCjoEventsMetadataItemsResult}).
 */
export class msdynmkt_GetAllCjoEventsMetadataItemsResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_GetAllCjoEventsMetadataItemsResult) {
    super("msdynmkt_GetAllCjoEventsMetadataItems");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_GetAllCjoEventsMetadataItemsResponse {
    return new msdynmkt_GetAllCjoEventsMetadataItemsResponse(
      data === undefined
        ? []
        : (data as { value: msdynmkt_GetAllCjoEventsMetadataItemsResult }).value
    );
  }
}
