import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_Updatefeatureconfig action
 */
export interface msdyn_UpdatefeatureconfigResponse {
  // No content returned
}

/**
 * msdyn_Updatefeatureconfig action
 *
 * Unbound action
 */
export class msdyn_UpdatefeatureconfigAction implements Executable<msdyn_UpdatefeatureconfigResponse> {
  constructor(
    public readonly featureType: number,
    public readonly configuration: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_Updatefeatureconfig`;

    const body: Record<string, unknown> = {
      featureType: this.featureType,
      configuration: this.configuration,
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

  async parseResponse(response: Response): Promise<msdyn_UpdatefeatureconfigResponse> {
    // No return value (204 No Content)
    return {};
  }
}
