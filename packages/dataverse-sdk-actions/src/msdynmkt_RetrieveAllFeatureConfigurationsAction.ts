import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdynmkt_RetrieveAllFeatureConfigurations action
 */
export interface msdynmkt_RetrieveAllFeatureConfigurationsResponse {
  value: EntityReference[];
}

/**
 * msdynmkt_RetrieveAllFeatureConfigurations action
 *
 * Unbound action
 */
export class msdynmkt_RetrieveAllFeatureConfigurationsAction implements Executable<msdynmkt_RetrieveAllFeatureConfigurationsResponse> {
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
    return data as msdynmkt_RetrieveAllFeatureConfigurationsResponse;
  }
}
