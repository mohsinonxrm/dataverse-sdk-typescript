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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ProvisionAnalyticsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ProvisionAnalyticsResponse;
  }
}
