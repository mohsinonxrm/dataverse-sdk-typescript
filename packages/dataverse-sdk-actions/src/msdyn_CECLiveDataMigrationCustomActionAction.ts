import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CECLiveDataMigrationCustomAction action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CECLiveDataMigrationCustomActionResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_CECLiveDataMigrationCustomActionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
