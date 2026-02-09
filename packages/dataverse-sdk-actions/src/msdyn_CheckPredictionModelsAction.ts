import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckPredictionModels action
 */
export interface msdyn_CheckPredictionModelsResponse {
  Exists: string;
}

/**
 * msdyn_CheckPredictionModels action
 *
 * Unbound action
 */
export class msdyn_CheckPredictionModelsAction implements Executable<msdyn_CheckPredictionModelsResponse> {
  constructor(public readonly predictionType: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckPredictionModels`;

    const body: Record<string, unknown> = {
      PredictionType: this.predictionType,
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

  async parseResponse(response: Response): Promise<msdyn_CheckPredictionModelsResponse> {
    const data = await response.json();
    return data as msdyn_CheckPredictionModelsResponse;
  }
}
