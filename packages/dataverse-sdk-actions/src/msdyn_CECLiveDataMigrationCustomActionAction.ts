import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CECLiveDataMigrationCustomAction action
 */
export interface msdyn_CECLiveDataMigrationCustomActionResponse {
  // No content returned
}

/**
 * msdyn_CECLiveDataMigrationCustomAction action
 *
 * Unbound action
 */
export class msdyn_CECLiveDataMigrationCustomActionAction implements Executable<msdyn_CECLiveDataMigrationCustomActionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CECLiveDataMigrationCustomAction`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CECLiveDataMigrationCustomActionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
