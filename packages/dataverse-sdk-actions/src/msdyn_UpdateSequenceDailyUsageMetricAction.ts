import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateSequenceDailyUsageMetric action
 */
export interface msdyn_UpdateSequenceDailyUsageMetricResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_UpdateSequenceDailyUsageMetric action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateSequenceDailyUsageMetricActionParameters {
  PreviousDaysCount?: number;
}

/**
 * msdyn_UpdateSequenceDailyUsageMetric action
 *
 * Unbound action
 */
export class msdyn_UpdateSequenceDailyUsageMetricAction implements Executable<msdyn_UpdateSequenceDailyUsageMetricResponse> {
  constructor(
    public readonly parameters: msdyn_UpdateSequenceDailyUsageMetricActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSequenceDailyUsageMetric`;

    const body = requestBody({
      PreviousDaysCount: this.parameters.PreviousDaysCount,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_UpdateSequenceDailyUsageMetricResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_UpdateSequenceDailyUsageMetricResponse;
  }
}
