import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TriggerForecastPredictions action
 */
export interface msdyn_TriggerForecastPredictionsResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_TriggerForecastPredictions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerForecastPredictionsActionParameters {
  InputData: string;
}

/**
 * msdyn_TriggerForecastPredictions action
 *
 * Unbound action
 */
export class msdyn_TriggerForecastPredictionsAction implements Executable<msdyn_TriggerForecastPredictionsResponse> {
  constructor(public readonly parameters: msdyn_TriggerForecastPredictionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerForecastPredictions`;

    const body = requestBody({
      InputData: this.parameters.InputData,
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

  async parseResponse(response: Response): Promise<msdyn_TriggerForecastPredictionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TriggerForecastPredictionsResponse;
    return (await response.json()) as msdyn_TriggerForecastPredictionsResponse;
  }
}
