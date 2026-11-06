import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_ForecastRecalculate action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ForecastRecalculateResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_ForecastRecalculateResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
