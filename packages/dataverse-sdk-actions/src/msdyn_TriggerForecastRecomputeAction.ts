import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TriggerForecastRecompute action
 */
export interface msdyn_TriggerForecastRecomputeResponse {
  // No content returned
}

/**
 * msdyn_TriggerForecastRecompute action
 *
 * Unbound action
 */
export class msdyn_TriggerForecastRecomputeAction implements Executable<msdyn_TriggerForecastRecomputeResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerForecastRecompute`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_TriggerForecastRecomputeResponse> {
    // No return value (204 No Content)
    return {};
  }
}
