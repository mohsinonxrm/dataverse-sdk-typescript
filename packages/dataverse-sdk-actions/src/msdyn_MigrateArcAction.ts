import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_MigrateArc action
 */
export interface msdyn_MigrateArcResponse {
  OutputString: string;
  Exception: string;
}

/**
 * msdyn_MigrateArc action
 *
 * Unbound action
 */
export class msdyn_MigrateArcAction implements Executable<msdyn_MigrateArcResponse> {
  constructor(public readonly arcMigrationRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateArc`;

    const body: Record<string, unknown> = {
      ArcMigrationRequest: this.arcMigrationRequest,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MigrateArcResponse> {
    const data = await response.json();
    return data as msdyn_MigrateArcResponse;
  }
}
