import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_HandleTrainingStatus action
 */
export interface msdyn_HandleTrainingStatusResponse {
  // No content returned
}

/**
 * msdyn_HandleTrainingStatus action
 *
 * Unbound action
 */
export class msdyn_HandleTrainingStatusAction implements Executable<msdyn_HandleTrainingStatusResponse> {
  constructor(
    public readonly curentModel: string,
    public readonly previousModel: string | undefined,
    public readonly predictionScheduledOperation: string | undefined,
    public readonly trainingResult: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_HandleTrainingStatus`;

    const body: Record<string, unknown> = {
      CurentModel: this.curentModel,
      PreviousModel: this.previousModel,
      PredictionScheduledOperation: this.predictionScheduledOperation,
      TrainingResult: this.trainingResult,
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

  async parseResponse(response: Response): Promise<msdyn_HandleTrainingStatusResponse> {
    // No return value (204 No Content)
    return {};
  }
}
