import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_EffortModelPrediction action
 */
export interface msdyn_EffortModelPredictionResponse {
  PredictionResult: string;
}

/**
 * msdyn_EffortModelPrediction action
 *
 * Unbound action
 */
export class msdyn_EffortModelPredictionAction implements Executable<msdyn_EffortModelPredictionResponse> {
  constructor(
    public readonly inputRequest: string,
    public readonly aiModelId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EffortModelPrediction`;

    const body: Record<string, unknown> = {
      InputRequest: this.inputRequest,
      AiModelId: this.aiModelId,
    };

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
    const data = await response.json();
    return data as msdyn_EffortModelPredictionResponse;
  }
}
