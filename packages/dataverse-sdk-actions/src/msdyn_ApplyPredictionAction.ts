import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ApplyPrediction action
 */
export interface msdyn_ApplyPredictionResponse {
  // No content returned
}

/**
 * msdyn_ApplyPrediction action
 *
 * Unbound action
 */
export class msdyn_ApplyPredictionAction implements Executable<msdyn_ApplyPredictionResponse> {
  constructor(public readonly autoScheduleTrainingConfig?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ApplyPrediction`;

    const body: Record<string, unknown> = {
      AutoScheduleTrainingConfig: this.autoScheduleTrainingConfig,
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

  async parseResponse(response: Response): Promise<msdyn_ApplyPredictionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
