import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateSequenceDailyUsageMetric action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateSequenceDailyUsageMetricResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_UpdateSequenceDailyUsageMetricResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
