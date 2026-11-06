import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_RetrieveAllFeatureConfigurations request message
 *
 * Web API Action: msdynmkt_RetrieveAllFeatureConfigurations
 */
export class msdynmkt_RetrieveAllFeatureConfigurationsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_RetrieveAllFeatureConfigurationsResponse>
{
  constructor() {
    super("msdynmkt_RetrieveAllFeatureConfigurations");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_RetrieveAllFeatureConfigurations`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_RetrieveAllFeatureConfigurationsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return msdynmkt_RetrieveAllFeatureConfigurationsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdynmkt_RetrieveAllFeatureConfigurationsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_RetrieveAllFeatureConfigurations action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdynmkt_RetrieveAllFeatureConfigurationsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdynmkt_RetrieveAllFeatureConfigurations response message
 *
 * `result` is the value the msdynmkt_RetrieveAllFeatureConfigurations action returns (see {@link msdynmkt_RetrieveAllFeatureConfigurationsResult}).
 */
export class msdynmkt_RetrieveAllFeatureConfigurationsResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_RetrieveAllFeatureConfigurationsResult) {
    super("msdynmkt_RetrieveAllFeatureConfigurations");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_RetrieveAllFeatureConfigurationsResponse {
    return new msdynmkt_RetrieveAllFeatureConfigurationsResponse(
      data === undefined
        ? []
        : (data as { value: msdynmkt_RetrieveAllFeatureConfigurationsResult }).value
    );
  }
}
