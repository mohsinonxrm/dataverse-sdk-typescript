import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_GetDataverseTableMetadataItems message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetDataverseTableMetadataItemsRequestParameters {
  msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading?: boolean;
  msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames: string[];
  msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode?: number;
}

/**
 * msdynmkt_GetDataverseTableMetadataItems request message
 *
 * Web API Action: msdynmkt_GetDataverseTableMetadataItems
 */
export class msdynmkt_GetDataverseTableMetadataItemsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetDataverseTableMetadataItemsResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_GetDataverseTableMetadataItemsRequestParameters>;

  constructor(parameters: msdynmkt_GetDataverseTableMetadataItemsRequestParameters) {
    super("msdynmkt_GetDataverseTableMetadataItems", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetDataverseTableMetadataItems`;

    const body = requestBody({
      msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading:
        this.Parameters.msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading,
      msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames:
        this.Parameters.msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames,
      msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode:
        this.Parameters.msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode,
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
  ): Promise<msdynmkt_GetDataverseTableMetadataItemsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return msdynmkt_GetDataverseTableMetadataItemsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdynmkt_GetDataverseTableMetadataItemsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_GetDataverseTableMetadataItems action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdynmkt_GetDataverseTableMetadataItemsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdynmkt_GetDataverseTableMetadataItems response message
 *
 * `result` is the value the msdynmkt_GetDataverseTableMetadataItems action returns (see {@link msdynmkt_GetDataverseTableMetadataItemsResult}).
 */
export class msdynmkt_GetDataverseTableMetadataItemsResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_GetDataverseTableMetadataItemsResult) {
    super("msdynmkt_GetDataverseTableMetadataItems");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_GetDataverseTableMetadataItemsResponse {
    return new msdynmkt_GetDataverseTableMetadataItemsResponse(
      data === undefined
        ? []
        : (data as { value: msdynmkt_GetDataverseTableMetadataItemsResult }).value
    );
  }
}
