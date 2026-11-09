import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msft_GetSecHubFeatureData request message
 *
 * Web API Action: msft_GetSecHubFeatureData
 */
export class msft_GetSecHubFeatureDataRequest
  extends OrganizationRequest
  implements Executable<msft_GetSecHubFeatureDataResponse>
{
  constructor() {
    super("msft_GetSecHubFeatureData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_GetSecHubFeatureData`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msft_GetSecHubFeatureDataResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return msft_GetSecHubFeatureDataResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msft_GetSecHubFeatureDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msft_GetSecHubFeatureData action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msft_GetSecHubFeatureDataResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msft_GetSecHubFeatureData response message
 *
 * `result` is the value the msft_GetSecHubFeatureData action returns (see {@link msft_GetSecHubFeatureDataResult}).
 */
export class msft_GetSecHubFeatureDataResponse extends OrganizationResponse {
  constructor(public result: msft_GetSecHubFeatureDataResult) {
    super("msft_GetSecHubFeatureData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msft_GetSecHubFeatureDataResponse {
    return new msft_GetSecHubFeatureDataResponse(
      data === undefined ? [] : (data as { value: msft_GetSecHubFeatureDataResult }).value
    );
  }
}
