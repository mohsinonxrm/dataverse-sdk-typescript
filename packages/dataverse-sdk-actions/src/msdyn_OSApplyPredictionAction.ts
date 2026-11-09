import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_OSApplyPrediction action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_OSApplyPredictionResponse = void;

/**
 * Parameters of the msdyn_OSApplyPrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSApplyPredictionActionParameters {
  AutoScheduleTrainingConfig?: string;
}

/**
 * msdyn_OSApplyPrediction action
 *
 * Unbound action
 */
export class msdyn_OSApplyPredictionAction implements Executable<msdyn_OSApplyPredictionResponse> {
  constructor(public readonly parameters: msdyn_OSApplyPredictionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSApplyPrediction`;

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

  parseResponse(_response: Response): Promise<msdyn_OSApplyPredictionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
