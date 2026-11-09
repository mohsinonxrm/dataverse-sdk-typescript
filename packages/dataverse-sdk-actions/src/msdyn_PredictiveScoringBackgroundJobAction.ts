import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_PredictiveScoringBackgroundJob action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_PredictiveScoringBackgroundJobResponse = void;

/**
 * Parameters of the msdyn_PredictiveScoringBackgroundJob action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PredictiveScoringBackgroundJobActionParameters {
  InputData?: string;
}

/**
 * msdyn_PredictiveScoringBackgroundJob action
 *
 * Unbound action
 */
export class msdyn_PredictiveScoringBackgroundJobAction implements Executable<msdyn_PredictiveScoringBackgroundJobResponse> {
  constructor(
    public readonly parameters: msdyn_PredictiveScoringBackgroundJobActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictiveScoringBackgroundJob`;

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

  parseResponse(_response: Response): Promise<msdyn_PredictiveScoringBackgroundJobResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
