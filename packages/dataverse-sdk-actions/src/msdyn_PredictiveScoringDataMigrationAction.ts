import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_PredictiveScoringDataMigration action
 */
export interface msdyn_PredictiveScoringDataMigrationResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_PredictiveScoringDataMigration action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PredictiveScoringDataMigrationActionParameters {
  InputData?: string;
}

/**
 * msdyn_PredictiveScoringDataMigration action
 *
 * Unbound action
 */
export class msdyn_PredictiveScoringDataMigrationAction implements Executable<msdyn_PredictiveScoringDataMigrationResponse> {
  constructor(
    public readonly parameters: msdyn_PredictiveScoringDataMigrationActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictiveScoringDataMigration`;

    const body = requestBody({
      InputData: this.parameters.InputData,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_PredictiveScoringDataMigrationResponse;
  }
}
