import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OSApplyPrediction action
 */
export interface msdyn_OSApplyPredictionResponse {
  // No content returned
}

/**
 * msdyn_OSApplyPrediction action
 *
 * Unbound action
 */
export class msdyn_OSApplyPredictionAction implements Executable<msdyn_OSApplyPredictionResponse> {
  constructor(public readonly autoScheduleTrainingConfig?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSApplyPrediction`;

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

  async parseResponse(response: Response): Promise<msdyn_OSApplyPredictionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
