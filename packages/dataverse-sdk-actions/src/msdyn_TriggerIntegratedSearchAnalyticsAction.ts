import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TriggerIntegratedSearchAnalytics action
 */
export interface msdyn_TriggerIntegratedSearchAnalyticsResponse {
  msdyn_IntegratedSearchAnalyticsResponse: string;
}

/**
 * msdyn_TriggerIntegratedSearchAnalytics action
 *
 * Unbound action
 */
export class msdyn_TriggerIntegratedSearchAnalyticsAction implements Executable<msdyn_TriggerIntegratedSearchAnalyticsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerIntegratedSearchAnalytics`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerIntegratedSearchAnalyticsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TriggerIntegratedSearchAnalyticsResponse;
    return (await response.json()) as msdyn_TriggerIntegratedSearchAnalyticsResponse;
  }
}
