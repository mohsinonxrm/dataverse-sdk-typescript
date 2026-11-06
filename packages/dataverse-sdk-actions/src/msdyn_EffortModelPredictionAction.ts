import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_EffortModelPrediction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EffortModelPredictionResponse {
  "@odata.context"?: string;
  PredictionResult: string;
}

/**
 * Parameters of the msdyn_EffortModelPrediction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EffortModelPredictionActionParameters {
  InputRequest: string;
  AiModelId: string;
}

/**
 * msdyn_EffortModelPrediction action
 *
 * Unbound action
 */
export class msdyn_EffortModelPredictionAction implements Executable<msdyn_EffortModelPredictionResponse> {
  constructor(public readonly parameters: msdyn_EffortModelPredictionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EffortModelPrediction`;

    const body = requestBody({
      InputRequest: this.parameters.InputRequest,
      AiModelId: this.parameters.AiModelId,
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

  async parseResponse(response: Response): Promise<msdyn_EffortModelPredictionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_EffortModelPredictionResponse;
  }
}
