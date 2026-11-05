import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_PredictiveScoringDataMigration request message
 *
 * Web API Action: msdyn_PredictiveScoringDataMigration
 */
export class msdyn_PredictiveScoringDataMigrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_PredictiveScoringDataMigrationResponse>
{
  constructor(public inputData: string) {
    super("msdyn_PredictiveScoringDataMigration");
  }

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
    return new msdyn_PredictiveScoringDataMigrationResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
    };
  }
}

/**
 * msdyn_PredictiveScoringDataMigration response message
 */
export class msdyn_PredictiveScoringDataMigrationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_PredictiveScoringDataMigration");
  }

  static fromResponse(_data: unknown): msdyn_PredictiveScoringDataMigrationResponse {
    return new msdyn_PredictiveScoringDataMigrationResponse();
  }
}
