import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_TriggerForecastPredictions action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_TriggerForecastPredictionsResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_TriggerForecastPredictionsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
