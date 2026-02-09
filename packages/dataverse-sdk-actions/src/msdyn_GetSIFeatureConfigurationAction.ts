import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSIFeatureConfiguration action
 */
export interface msdyn_GetSIFeatureConfigurationResponse {
  FeatureConfiguration: string;
}

/**
 * msdyn_GetSIFeatureConfiguration action
 *
 * Unbound action
 */
export class msdyn_GetSIFeatureConfigurationAction implements Executable<msdyn_GetSIFeatureConfigurationResponse> {
  constructor(
    public readonly sIParameters: string,
    public readonly orgMigratedToCoreServices: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSIFeatureConfiguration`;

    const body: Record<string, unknown> = {
      SIParameters: this.sIParameters,
      OrgMigratedToCoreServices: this.orgMigratedToCoreServices,
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

  async parseResponse(response: Response): Promise<msdyn_GetSIFeatureConfigurationResponse> {
    const data = await response.json();
    return data as msdyn_GetSIFeatureConfigurationResponse;
  }
}
