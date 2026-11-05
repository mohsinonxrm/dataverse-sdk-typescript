import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OSDeletePrediction action
 */
export interface msdyn_OSDeletePredictionResponse {
  // No content returned
}

/**
 * msdyn_OSDeletePrediction action
 *
 * Unbound action
 */
export class msdyn_OSDeletePredictionAction implements Executable<msdyn_OSDeletePredictionResponse> {
  constructor(
    public readonly modelId: string,
    public readonly isCrmDeleteOnly: boolean,
    public readonly predictionName: string,
    public readonly isActiveModel: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSDeletePrediction`;

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

  async parseResponse(response: Response): Promise<msdyn_OSDeletePredictionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
