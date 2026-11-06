import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TriggerForecastRecompute action
 */
export interface msdyn_TriggerForecastRecomputeResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_TriggerForecastRecomputeResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_TriggerForecastRecomputeResponse;
  }
}
