import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetTrainingResults action
 */
export interface msdyn_GetTrainingResultsResponse {
  TrainingResults: string;
}

/**
 * msdyn_GetTrainingResults action
 *
 * Unbound action
 */
export class msdyn_GetTrainingResultsAction implements Executable<msdyn_GetTrainingResultsResponse> {
  constructor(public readonly predictionName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTrainingResults`;

    const body: Record<string, unknown> = {
      PredictionName: this.predictionName,
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

  async parseResponse(response: Response): Promise<msdyn_GetTrainingResultsResponse> {
    const data = await response.json();
    return data as msdyn_GetTrainingResultsResponse;
  }
}
