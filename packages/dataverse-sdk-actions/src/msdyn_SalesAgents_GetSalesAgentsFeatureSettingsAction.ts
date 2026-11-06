import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_GetSalesAgentsFeatureSettings action
 */
export interface msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse {
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_GetSalesAgentsFeatureSettings action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetSalesAgentsFeatureSettingsAction implements Executable<msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetSalesAgentsFeatureSettings`;

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
  ): Promise<msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse;
    return (await response.json()) as msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse;
  }
}
