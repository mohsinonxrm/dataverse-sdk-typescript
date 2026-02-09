import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetGPT3Prediction action
 */
export interface msdyn_GetGPT3PredictionResponse {
  msdyn_status: number;
  msdyn_prediction: string;
}

/**
 * msdyn_GetGPT3Prediction action
 *
 * Unbound action
 */
export class msdyn_GetGPT3PredictionAction implements Executable<msdyn_GetGPT3PredictionResponse> {
  constructor(
    public readonly msdyn_input: string,
    public readonly msdyn_predictiontype: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetGPT3Prediction`;

    const body: Record<string, unknown> = {
      msdyn_input: this.msdyn_input,
      msdyn_predictiontype: this.msdyn_predictiontype,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetGPT3PredictionResponse> {
    const data = await response.json();
    return data as msdyn_GetGPT3PredictionResponse;
  }
}
