import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OSGetTrainingResults action
 */
export interface msdyn_OSGetTrainingResultsResponse {
  TrainingResults: string;
}

/**
 * msdyn_OSGetTrainingResults action
 *
 * Unbound action
 */
export class msdyn_OSGetTrainingResultsAction implements Executable<msdyn_OSGetTrainingResultsResponse> {
  constructor(public readonly predictionName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSGetTrainingResults`;

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

  async parseResponse(response: Response): Promise<msdyn_OSGetTrainingResultsResponse> {
    const data = await response.json();
    return data as msdyn_OSGetTrainingResultsResponse;
  }
}
