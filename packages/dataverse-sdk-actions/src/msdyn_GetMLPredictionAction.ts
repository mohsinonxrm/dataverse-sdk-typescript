import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetMLPrediction action
 */
export interface msdyn_GetMLPredictionResponse {
  msdyn_prediction: string;
  msdyn_status: number;
}

/**
 * msdyn_GetMLPrediction action
 *
 * Unbound action
 */
export class msdyn_GetMLPredictionAction implements Executable<msdyn_GetMLPredictionResponse> {
  constructor(
    public readonly msdyn_predictiontype: number,
    public readonly msdyn_input: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMLPrediction`;

    const body: Record<string, unknown> = {
      msdyn_predictiontype: this.msdyn_predictiontype,
      msdyn_input: this.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetMLPredictionResponse> {
    const data = await response.json();
    return data as msdyn_GetMLPredictionResponse;
  }
}
