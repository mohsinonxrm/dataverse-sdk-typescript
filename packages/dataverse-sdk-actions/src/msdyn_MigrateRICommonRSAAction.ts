import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_MigrateRICommonRSA action
 */
export interface msdyn_MigrateRICommonRSAResponse {
  // No content returned
}

/**
 * msdyn_MigrateRICommonRSA action
 *
 * Unbound action
 */
export class msdyn_MigrateRICommonRSAAction implements Executable<msdyn_MigrateRICommonRSAResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateRICommonRSA`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateRICommonRSAResponse> {
    // No return value (204 No Content)
    return {};
  }
}
