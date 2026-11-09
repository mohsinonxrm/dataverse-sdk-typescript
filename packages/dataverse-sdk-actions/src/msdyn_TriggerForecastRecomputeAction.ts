import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_TriggerForecastRecompute action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_TriggerForecastRecomputeResponse = void;

/**
 * Parameters of the msdyn_TriggerForecastRecompute action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerForecastRecomputeActionParameters {
  InputData: string;
}

/**
 * msdyn_TriggerForecastRecompute action
 *
 * Unbound action
 */
export class msdyn_TriggerForecastRecomputeAction implements Executable<msdyn_TriggerForecastRecomputeResponse> {
  constructor(public readonly parameters: msdyn_TriggerForecastRecomputeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerForecastRecompute`;

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

  parseResponse(_response: Response): Promise<msdyn_TriggerForecastRecomputeResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
