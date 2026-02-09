import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FetchAllPredictionModels action
 */
export interface msdyn_FetchAllPredictionModelsResponse {
  Response: string;
}

/**
 * msdyn_FetchAllPredictionModels action
 *
 * Unbound action
 */
export class msdyn_FetchAllPredictionModelsAction implements Executable<msdyn_FetchAllPredictionModelsResponse> {
  constructor(public readonly predictionType: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchAllPredictionModels`;

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

  async parseResponse(response: Response): Promise<msdyn_FetchAllPredictionModelsResponse> {
    const data = await response.json();
    return data as msdyn_FetchAllPredictionModelsResponse;
  }
}
