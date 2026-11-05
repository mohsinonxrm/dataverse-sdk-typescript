import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AgentscriptDataMigrationCustomAction action
 */
export interface msdyn_AgentscriptDataMigrationCustomActionResponse {
  // No content returned
}

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_AgentscriptDataMigrationCustomActionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
