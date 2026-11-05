import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ProvisionODOS action
 */
export interface msdyn_ProvisionODOSResponse {
  // No content returned
}

/**
 * msdyn_ProvisionODOS action
 *
 * Unbound action
 */
export class msdyn_ProvisionODOSAction implements Executable<msdyn_ProvisionODOSResponse> {
  constructor(
    public readonly entities: string,
    public readonly featureName: string,
    public readonly featureDisplayName: string,
    public readonly roles: string,
    public readonly primitives: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionODOS`;

    const body: Record<string, unknown> = {
      Entities: this.entities,
      FeatureName: this.featureName,
      FeatureDisplayName: this.featureDisplayName,
      Roles: this.roles,
      Primitives: this.primitives,
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

  async parseResponse(response: Response): Promise<msdyn_ProvisionODOSResponse> {
    // No return value (204 No Content)
    return {};
  }
}
