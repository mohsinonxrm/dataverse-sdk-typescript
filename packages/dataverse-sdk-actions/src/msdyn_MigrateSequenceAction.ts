import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_MigrateSequence action
 */
export interface msdyn_MigrateSequenceResponse {
  // No content returned
}

/**
 * msdyn_MigrateSequence action
 *
 * Unbound action
 */
export class msdyn_MigrateSequenceAction implements Executable<msdyn_MigrateSequenceResponse> {
  constructor(public readonly migrationId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateSequence`;

    const body: Record<string, unknown> = {
      MigrationId: this.migrationId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MigrateSequenceResponse> {
    // No return value (204 No Content)
    return {};
  }
}
