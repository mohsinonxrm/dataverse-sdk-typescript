import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_OverflowMigrationAPI action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_OverflowMigrationAPIResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_OverflowMigrationAPIResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
