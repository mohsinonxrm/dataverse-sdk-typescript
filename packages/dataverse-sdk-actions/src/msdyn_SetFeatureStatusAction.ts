import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SetFeatureStatus action
 */
export interface msdyn_SetFeatureStatusResponse {
  // No content returned
}

/**
 * msdyn_SetFeatureStatus action
 *
 * Unbound action
 */
export class msdyn_SetFeatureStatusAction implements Executable<msdyn_SetFeatureStatusResponse> {
  constructor(
    public readonly featureType: number,
    public readonly status: boolean,
    public readonly isSolutionUninstall: boolean,
    public readonly configurationData: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetFeatureStatus`;

    const body: Record<string, unknown> = {
      FeatureType: this.featureType,
      Status: this.status,
      IsSolutionUninstall: this.isSolutionUninstall,
      ConfigurationData: this.configurationData,
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

  async parseResponse(response: Response): Promise<msdyn_SetFeatureStatusResponse> {
    // No return value (204 No Content)
    return {};
  }
}
