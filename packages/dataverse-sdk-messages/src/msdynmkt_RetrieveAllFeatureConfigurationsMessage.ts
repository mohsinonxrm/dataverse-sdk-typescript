import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_RetrieveAllFeatureConfigurationsResponse> {
    const data = await response.json();
    return msdynmkt_RetrieveAllFeatureConfigurationsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdynmkt_RetrieveAllFeatureConfigurations response message
 */
export class msdynmkt_RetrieveAllFeatureConfigurationsResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("msdynmkt_RetrieveAllFeatureConfigurations");
  }

  static fromResponse(data: unknown): msdynmkt_RetrieveAllFeatureConfigurationsResponse {
    return new msdynmkt_RetrieveAllFeatureConfigurationsResponse((data as any).value);
  }
}
