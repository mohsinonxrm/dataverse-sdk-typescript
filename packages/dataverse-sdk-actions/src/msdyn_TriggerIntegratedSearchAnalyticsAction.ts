import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_TriggerIntegratedSearchAnalytics action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TriggerIntegratedSearchAnalyticsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_TriggerIntegratedSearchAnalyticsResponse;
  }
}
