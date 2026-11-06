import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdynmkt_RetrieveAllFeatureConfigurationsResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdynmkt_RetrieveAllFeatureConfigurations response message
 */
export class msdynmkt_RetrieveAllFeatureConfigurationsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdynmkt_RetrieveAllFeatureConfigurations");
  }

  static fromResponse(data: unknown): msdynmkt_RetrieveAllFeatureConfigurationsResponse {
    return new msdynmkt_RetrieveAllFeatureConfigurationsResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
