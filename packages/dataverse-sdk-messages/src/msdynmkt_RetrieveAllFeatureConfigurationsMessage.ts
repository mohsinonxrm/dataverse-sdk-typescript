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
    const data = await response.json();
    return msdynmkt_RetrieveAllFeatureConfigurationsResponse.fromResponse(data);
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
