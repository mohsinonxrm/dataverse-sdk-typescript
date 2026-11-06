import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_ForecastRecalculate action
 */
export interface msdyn_ForecastRecalculateResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ForecastRecalculate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ForecastRecalculateActionParameters {
  ForecastInstance: EntityReference | AnyEntityPayload;
  IsRefreshHierarchy: boolean;
}

/**
 * msdyn_ForecastRecalculate action
 *
 * Unbound action
 */
export class msdyn_ForecastRecalculateAction implements Executable<msdyn_ForecastRecalculateResponse> {
  constructor(public readonly parameters: msdyn_ForecastRecalculateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastRecalculate`;

    const body = requestBody({
      ForecastInstance: this.parameters.ForecastInstance,
      IsRefreshHierarchy: this.parameters.IsRefreshHierarchy,
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

  async parseResponse(response: Response): Promise<msdyn_ForecastRecalculateResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ForecastRecalculateResponse;
  }
}
