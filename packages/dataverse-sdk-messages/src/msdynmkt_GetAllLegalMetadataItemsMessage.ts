import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_GetAllLegalMetadataItems message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetAllLegalMetadataItemsRequestParameters {
  msdynmkt_GetAllLegalMetadataItems_request_LanguageCode?: number;
}

/**
 * msdynmkt_GetAllLegalMetadataItems request message
 *
 * Web API Action: msdynmkt_GetAllLegalMetadataItems
 */
export class msdynmkt_GetAllLegalMetadataItemsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetAllLegalMetadataItemsResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_GetAllLegalMetadataItemsRequestParameters>;

  constructor(parameters: msdynmkt_GetAllLegalMetadataItemsRequestParameters = {}) {
    super("msdynmkt_GetAllLegalMetadataItems", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetAllLegalMetadataItems`;

    const body = requestBody({
      msdynmkt_GetAllLegalMetadataItems_request_LanguageCode:
        this.Parameters.msdynmkt_GetAllLegalMetadataItems_request_LanguageCode,
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
    if (response.status === 204)
      return msdynmkt_GetAllLegalMetadataItemsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdynmkt_GetAllLegalMetadataItemsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_GetAllLegalMetadataItems action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdynmkt_GetAllLegalMetadataItemsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdynmkt_GetAllLegalMetadataItems response message
 *
 * `result` is the value the msdynmkt_GetAllLegalMetadataItems action returns (see {@link msdynmkt_GetAllLegalMetadataItemsResult}).
 */
export class msdynmkt_GetAllLegalMetadataItemsResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_GetAllLegalMetadataItemsResult) {
    super("msdynmkt_GetAllLegalMetadataItems");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_GetAllLegalMetadataItemsResponse {
    return new msdynmkt_GetAllLegalMetadataItemsResponse(
      data === undefined ? [] : (data as { value: msdynmkt_GetAllLegalMetadataItemsResult }).value
    );
  }
}
