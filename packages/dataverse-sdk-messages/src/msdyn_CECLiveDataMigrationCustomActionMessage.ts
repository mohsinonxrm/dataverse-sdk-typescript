import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CECLiveDataMigrationCustomAction request message
 *
 * Web API Action: msdyn_CECLiveDataMigrationCustomAction
 */
export class msdyn_CECLiveDataMigrationCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CECLiveDataMigrationCustomActionResponse>
{
  constructor() {
    super("msdyn_CECLiveDataMigrationCustomAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CECLiveDataMigrationCustomAction`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CECLiveDataMigrationCustomActionResponse> {
    // No return value (204 No Content)
    return new msdyn_CECLiveDataMigrationCustomActionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CECLiveDataMigrationCustomAction response message
 */
export class msdyn_CECLiveDataMigrationCustomActionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CECLiveDataMigrationCustomAction");
  }

  static fromResponse(_data: unknown): msdyn_CECLiveDataMigrationCustomActionResponse {
    return new msdyn_CECLiveDataMigrationCustomActionResponse();
  }
}
