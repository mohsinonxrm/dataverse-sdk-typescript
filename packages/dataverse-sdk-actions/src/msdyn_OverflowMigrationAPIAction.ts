import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OverflowMigrationAPI action
 */
export interface msdyn_OverflowMigrationAPIResponse {
  // No content returned
}

/**
 * msdyn_OverflowMigrationAPI action
 *
 * Unbound action
 */
export class msdyn_OverflowMigrationAPIAction implements Executable<msdyn_OverflowMigrationAPIResponse> {
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
    return {};
  }
}
