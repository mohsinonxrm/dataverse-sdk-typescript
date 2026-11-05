import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PredictiveScoringDataMigration action
 */
export interface msdyn_PredictiveScoringDataMigrationResponse {
  // No content returned
}

/**
 * msdyn_PredictiveScoringDataMigration action
 *
 * Unbound action
 */
export class msdyn_PredictiveScoringDataMigrationAction implements Executable<msdyn_PredictiveScoringDataMigrationResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictiveScoringDataMigration`;

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

  async parseResponse(response: Response): Promise<msdyn_PredictiveScoringDataMigrationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
