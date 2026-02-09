import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ProvisionAnalytics action
 */
export interface msdyn_ProvisionAnalyticsResponse {
  msdyn_response: string;
}

/**
 * msdyn_ProvisionAnalytics action
 *
 * Unbound action
 */
export class msdyn_ProvisionAnalyticsAction implements Executable<msdyn_ProvisionAnalyticsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionAnalytics`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ProvisionAnalyticsResponse> {
    const data = await response.json();
    return data as msdyn_ProvisionAnalyticsResponse;
  }
}
