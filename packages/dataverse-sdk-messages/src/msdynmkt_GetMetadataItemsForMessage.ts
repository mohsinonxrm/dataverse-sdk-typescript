import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_GetMetadataItemsFor message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetMetadataItemsForRequestParameters {
  msdynmkt_GetMetadataItemsFor_request_LanguageCode?: number;
  msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames: string[];
}

/**
 * msdynmkt_GetMetadataItemsFor request message
 *
 * Web API Action: msdynmkt_GetMetadataItemsFor
 */
export class msdynmkt_GetMetadataItemsForRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetMetadataItemsForResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_GetMetadataItemsForRequestParameters>;

  constructor(parameters: msdynmkt_GetMetadataItemsForRequestParameters) {
    super("msdynmkt_GetMetadataItemsFor", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetMetadataItemsFor`;

    const body = requestBody({
      msdynmkt_GetMetadataItemsFor_request_LanguageCode:
        this.Parameters.msdynmkt_GetMetadataItemsFor_request_LanguageCode,
      msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames:
        this.Parameters.msdynmkt_GetMetadataItemsFor_request_SourceLogicalNames,
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

  async parseResponse(response: Response): Promise<msdynmkt_GetMetadataItemsForResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return msdynmkt_GetMetadataItemsForResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdynmkt_GetMetadataItemsForResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_GetMetadataItemsFor action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdynmkt_GetMetadataItemsForResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdynmkt_GetMetadataItemsFor response message
 *
 * `result` is the value the msdynmkt_GetMetadataItemsFor action returns (see {@link msdynmkt_GetMetadataItemsForResult}).
 */
export class msdynmkt_GetMetadataItemsForResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_GetMetadataItemsForResult) {
    super("msdynmkt_GetMetadataItemsFor");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_GetMetadataItemsForResponse {
    return new msdynmkt_GetMetadataItemsForResponse(
      data === undefined ? [] : (data as { value: msdynmkt_GetMetadataItemsForResult }).value
    );
  }
}
