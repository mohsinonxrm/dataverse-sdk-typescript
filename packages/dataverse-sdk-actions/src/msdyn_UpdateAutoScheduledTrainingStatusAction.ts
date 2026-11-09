import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateAutoScheduledTrainingStatus action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateAutoScheduledTrainingStatusResponse = void;

/**
 * Parameters of the msdyn_UpdateAutoScheduledTrainingStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateAutoScheduledTrainingStatusActionParameters {
  AutoScheduledTraining: boolean;
  PredictionName: string;
  PredictionType: string;
}

/**
 * msdyn_UpdateAutoScheduledTrainingStatus action
 *
 * Unbound action
 */
export class msdyn_UpdateAutoScheduledTrainingStatusAction implements Executable<msdyn_UpdateAutoScheduledTrainingStatusResponse> {
  constructor(
    public readonly parameters: msdyn_UpdateAutoScheduledTrainingStatusActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateAutoScheduledTrainingStatus`;

    const body = requestBody({
      AutoScheduledTraining: this.parameters.AutoScheduledTraining,
      PredictionName: this.parameters.PredictionName,
      PredictionType: this.parameters.PredictionType,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateAutoScheduledTrainingStatusResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
