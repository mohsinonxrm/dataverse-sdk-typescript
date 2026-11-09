import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CreatePrediction action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CreatePredictionResponse = void;

/**
 * Parameters of the msdyn_CreatePrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreatePredictionActionParameters {
  ModelState?: string;
}

/**
 * msdyn_CreatePrediction action
 *
 * Unbound action
 */
export class msdyn_CreatePredictionAction implements Executable<msdyn_CreatePredictionResponse> {
  constructor(public readonly parameters: msdyn_CreatePredictionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreatePrediction`;

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

  parseResponse(_response: Response): Promise<msdyn_CreatePredictionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
