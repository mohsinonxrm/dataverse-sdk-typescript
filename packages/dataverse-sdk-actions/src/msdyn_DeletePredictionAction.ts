import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_DeletePrediction action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_DeletePredictionResponse = void;

/**
 * Parameters of the msdyn_DeletePrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DeletePredictionActionParameters {
  ModelId?: string;
  IsCrmDeleteOnly?: boolean;
  PredictionName?: string;
  IsActiveModel?: boolean;
}

/**
 * msdyn_DeletePrediction action
 *
 * Unbound action
 */
export class msdyn_DeletePredictionAction implements Executable<msdyn_DeletePredictionResponse> {
  constructor(public readonly parameters: msdyn_DeletePredictionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeletePrediction`;

    const body = requestBody({
      ModelId: this.parameters.ModelId,
      IsCrmDeleteOnly: this.parameters.IsCrmDeleteOnly,
      PredictionName: this.parameters.PredictionName,
      IsActiveModel: this.parameters.IsActiveModel,
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

  parseResponse(_response: Response): Promise<msdyn_DeletePredictionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
