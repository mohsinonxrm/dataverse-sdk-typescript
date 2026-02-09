import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateSequenceDailyUsageMetric action
 */
export interface msdyn_UpdateSequenceDailyUsageMetricResponse {
  // No content returned
}

/**
 * msdyn_UpdateSequenceDailyUsageMetric action
 *
 * Unbound action
 */
export class msdyn_UpdateSequenceDailyUsageMetricAction implements Executable<msdyn_UpdateSequenceDailyUsageMetricResponse> {
  constructor(public readonly previousDaysCount: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSequenceDailyUsageMetric`;

    const body: Record<string, unknown> = {
      PreviousDaysCount: this.previousDaysCount,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_UpdateSequenceDailyUsageMetricResponse> {
    // No return value (204 No Content)
    return {};
  }
}
