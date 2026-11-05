import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TriggerForecastPredictions action
 */
export interface msdyn_TriggerForecastPredictionsResponse {
  // No content returned
}

/**
 * msdyn_TriggerForecastPredictions action
 *
 * Unbound action
 */
export class msdyn_TriggerForecastPredictionsAction implements Executable<msdyn_TriggerForecastPredictionsResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerForecastPredictions`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerForecastPredictionsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
