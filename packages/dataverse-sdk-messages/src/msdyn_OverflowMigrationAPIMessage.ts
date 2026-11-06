import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OverflowMigrationAPI request message
 *
 * Web API Action: msdyn_OverflowMigrationAPI
 */
export class msdyn_OverflowMigrationAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_OverflowMigrationAPIResponse>
{
  constructor() {
    super("msdyn_OverflowMigrationAPI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OverflowMigrationAPI`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OverflowMigrationAPIResponse> {
    // No return value (204 No Content)
    return new msdyn_OverflowMigrationAPIResponse();
  }
}

/**
 * msdyn_OverflowMigrationAPI response message
 */
export class msdyn_OverflowMigrationAPIResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_OverflowMigrationAPI");
  }

  static fromResponse(_data: unknown): msdyn_OverflowMigrationAPIResponse {
    return new msdyn_OverflowMigrationAPIResponse();
  }
}
