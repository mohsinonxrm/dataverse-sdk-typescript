import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_GetCjoEventsMetadataItemsByNames message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_GetCjoEventsMetadataItemsByNamesRequestParameters {
  msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode?: number;
  msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames: string[];
}

/**
 * msdynmkt_GetCjoEventsMetadataItemsByNames request message
 *
 * Web API Action: msdynmkt_GetCjoEventsMetadataItemsByNames
 */
export class msdynmkt_GetCjoEventsMetadataItemsByNamesRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetCjoEventsMetadataItemsByNamesResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_GetCjoEventsMetadataItemsByNamesRequestParameters>;

  constructor(parameters: msdynmkt_GetCjoEventsMetadataItemsByNamesRequestParameters) {
    super("msdynmkt_GetCjoEventsMetadataItemsByNames", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetCjoEventsMetadataItemsByNames`;

    const body = requestBody({
      msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode:
        this.Parameters.msdynmkt_GetCjoEventsMetadataItemsByNames_request_LanguageCode,
      msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames:
        this.Parameters.msdynmkt_GetCjoEventsMetadataItemsByNames_request_EventNames,
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
    if (response.status === 204)
      return msdynmkt_GetCjoEventsMetadataItemsByNamesResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdynmkt_GetCjoEventsMetadataItemsByNamesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_GetCjoEventsMetadataItemsByNames action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdynmkt_GetCjoEventsMetadataItemsByNamesResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdynmkt_GetCjoEventsMetadataItemsByNames response message
 *
 * `result` is the value the msdynmkt_GetCjoEventsMetadataItemsByNames action returns (see {@link msdynmkt_GetCjoEventsMetadataItemsByNamesResult}).
 */
export class msdynmkt_GetCjoEventsMetadataItemsByNamesResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_GetCjoEventsMetadataItemsByNamesResult) {
    super("msdynmkt_GetCjoEventsMetadataItemsByNames");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_GetCjoEventsMetadataItemsByNamesResponse {
    return new msdynmkt_GetCjoEventsMetadataItemsByNamesResponse(
      data === undefined
        ? []
        : (data as { value: msdynmkt_GetCjoEventsMetadataItemsByNamesResult }).value
    );
  }
}
