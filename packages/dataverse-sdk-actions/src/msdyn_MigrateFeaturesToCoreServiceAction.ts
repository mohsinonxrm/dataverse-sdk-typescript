import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_MigrateFeaturesToCoreService action
 */
export interface msdyn_MigrateFeaturesToCoreServiceResponse {
  // No content returned
}

/**
 * msdyn_MigrateFeaturesToCoreService action
 *
 * Unbound action
 */
export class msdyn_MigrateFeaturesToCoreServiceAction implements Executable<msdyn_MigrateFeaturesToCoreServiceResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateFeaturesToCoreService`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateFeaturesToCoreServiceResponse> {
    // No return value (204 No Content)
    return {};
  }
}
