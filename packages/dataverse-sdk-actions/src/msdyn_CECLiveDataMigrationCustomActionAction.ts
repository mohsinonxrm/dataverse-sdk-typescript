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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CECLiveDataMigrationCustomActionResponse;
    return (await response.json()) as msdyn_CECLiveDataMigrationCustomActionResponse;
  }
}
