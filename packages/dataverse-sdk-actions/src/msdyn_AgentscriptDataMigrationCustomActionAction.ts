import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_AgentscriptDataMigrationCustomAction action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_AgentscriptDataMigrationCustomActionResponse = void;

/**
 * msdyn_AgentscriptDataMigrationCustomAction action
 *
 * Unbound action
 */
export class msdyn_AgentscriptDataMigrationCustomActionAction implements Executable<msdyn_AgentscriptDataMigrationCustomActionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AgentscriptDataMigrationCustomAction`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_AgentscriptDataMigrationCustomActionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
