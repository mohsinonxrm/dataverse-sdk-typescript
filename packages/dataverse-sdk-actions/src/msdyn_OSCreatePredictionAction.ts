import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_OSCreatePrediction action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_OSCreatePredictionResponse = void;

/**
 * Parameters of the msdyn_OSCreatePrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSCreatePredictionActionParameters {
  ModelState?: string;
}

/**
 * msdyn_OSCreatePrediction action
 *
 * Unbound action
 */
export class msdyn_OSCreatePredictionAction implements Executable<msdyn_OSCreatePredictionResponse> {
  constructor(public readonly parameters: msdyn_OSCreatePredictionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSCreatePrediction`;

    const body = requestBody({
      ModelState: this.parameters.ModelState,
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

  parseResponse(_response: Response): Promise<msdyn_OSCreatePredictionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
