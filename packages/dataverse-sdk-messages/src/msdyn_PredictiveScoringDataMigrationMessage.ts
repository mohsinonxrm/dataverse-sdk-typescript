import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_PredictiveScoringDataMigration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PredictiveScoringDataMigrationRequestParameters {
  InputData?: string;
}

/**
 * msdyn_PredictiveScoringDataMigration request message
 *
 * Web API Action: msdyn_PredictiveScoringDataMigration
 */
export class msdyn_PredictiveScoringDataMigrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_PredictiveScoringDataMigrationResponse>
{
  declare readonly Parameters: Readonly<msdyn_PredictiveScoringDataMigrationRequestParameters>;

  constructor(parameters: msdyn_PredictiveScoringDataMigrationRequestParameters = {}) {
    super("msdyn_PredictiveScoringDataMigration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictiveScoringDataMigration`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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

  parseResponse(_response: Response): Promise<msdyn_PredictiveScoringDataMigrationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_PredictiveScoringDataMigrationResponse());
  }
}

/**
 * msdyn_PredictiveScoringDataMigration response message
 */
export class msdyn_PredictiveScoringDataMigrationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_PredictiveScoringDataMigration");
  }

  static fromResponse(_data?: unknown): msdyn_PredictiveScoringDataMigrationResponse {
    return new msdyn_PredictiveScoringDataMigrationResponse();
  }
}
