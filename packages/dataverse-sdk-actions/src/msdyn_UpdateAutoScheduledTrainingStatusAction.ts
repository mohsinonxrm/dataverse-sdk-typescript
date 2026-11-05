import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateAutoScheduledTrainingStatus action
 */
export interface msdyn_UpdateAutoScheduledTrainingStatusResponse {
  // No content returned
}

/**
 * msdyn_UpdateAutoScheduledTrainingStatus action
 *
 * Unbound action
 */
export class msdyn_UpdateAutoScheduledTrainingStatusAction implements Executable<msdyn_UpdateAutoScheduledTrainingStatusResponse> {
  constructor(
    public readonly autoScheduledTraining: boolean,
    public readonly predictionName: string,
    public readonly predictionType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateAutoScheduledTrainingStatus`;

    const body: Record<string, unknown> = {
      AutoScheduledTraining: this.autoScheduledTraining,
      PredictionName: this.predictionName,
      PredictionType: this.predictionType,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_UpdateAutoScheduledTrainingStatusResponse> {
    // No return value (204 No Content)
    return {};
  }
}
