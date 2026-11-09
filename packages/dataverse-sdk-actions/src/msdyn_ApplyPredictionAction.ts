import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ApplyPrediction action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ApplyPredictionResponse = void;

/**
 * Parameters of the msdyn_ApplyPrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ApplyPredictionActionParameters {
  AutoScheduleTrainingConfig?: string;
}

/**
 * msdyn_ApplyPrediction action
 *
 * Unbound action
 */
export class msdyn_ApplyPredictionAction implements Executable<msdyn_ApplyPredictionResponse> {
  constructor(public readonly parameters: msdyn_ApplyPredictionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ApplyPrediction`;

    const body = requestBody({
      AutoScheduleTrainingConfig: this.parameters.AutoScheduleTrainingConfig,
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

  parseResponse(_response: Response): Promise<msdyn_ApplyPredictionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
