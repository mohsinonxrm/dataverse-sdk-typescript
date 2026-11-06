import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_HandleTrainingStatus action
 */
export interface msdyn_HandleTrainingStatusResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_HandleTrainingStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_HandleTrainingStatusActionParameters {
  CurentModel: string;
  PreviousModel?: string;
  PredictionScheduledOperation?: string;
  TrainingResult: string;
}

/**
 * msdyn_HandleTrainingStatus action
 *
 * Unbound action
 */
export class msdyn_HandleTrainingStatusAction implements Executable<msdyn_HandleTrainingStatusResponse> {
  constructor(public readonly parameters: msdyn_HandleTrainingStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_HandleTrainingStatus`;

    const body = requestBody({
      CurentModel: this.parameters.CurentModel,
      PreviousModel: this.parameters.PreviousModel,
      PredictionScheduledOperation: this.parameters.PredictionScheduledOperation,
      TrainingResult: this.parameters.TrainingResult,
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

  async parseResponse(response: Response): Promise<msdyn_HandleTrainingStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_HandleTrainingStatusResponse;
    return (await response.json()) as msdyn_HandleTrainingStatusResponse;
  }
}
