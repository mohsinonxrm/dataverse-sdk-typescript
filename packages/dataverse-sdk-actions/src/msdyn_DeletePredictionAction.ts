import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DeletePrediction action
 */
export interface msdyn_DeletePredictionResponse {
  // No content returned
}

/**
 * msdyn_DeletePrediction action
 *
 * Unbound action
 */
export class msdyn_DeletePredictionAction implements Executable<msdyn_DeletePredictionResponse> {
  constructor(
    public readonly modelId: string,
    public readonly isCrmDeleteOnly: boolean,
    public readonly predictionName: string,
    public readonly isActiveModel: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeletePrediction`;

    const body: Record<string, unknown> = {
      ModelId: this.modelId,
      IsCrmDeleteOnly: this.isCrmDeleteOnly,
      PredictionName: this.predictionName,
      IsActiveModel: this.isActiveModel,
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

  async parseResponse(response: Response): Promise<msdyn_DeletePredictionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
