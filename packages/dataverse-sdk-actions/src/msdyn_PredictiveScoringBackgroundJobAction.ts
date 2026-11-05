import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PredictiveScoringBackgroundJob action
 */
export interface msdyn_PredictiveScoringBackgroundJobResponse {
  // No content returned
}

/**
 * msdyn_PredictiveScoringBackgroundJob action
 *
 * Unbound action
 */
export class msdyn_PredictiveScoringBackgroundJobAction implements Executable<msdyn_PredictiveScoringBackgroundJobResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictiveScoringBackgroundJob`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_PredictiveScoringBackgroundJobResponse> {
    // No return value (204 No Content)
    return {};
  }
}
