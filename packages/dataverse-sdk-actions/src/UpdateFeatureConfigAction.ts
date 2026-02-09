import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UpdateFeatureConfig action
 */
export interface UpdateFeatureConfigResponse {
  // No content returned
}

/**
 * UpdateFeatureConfig action
 *
 * Unbound action
 */
export class UpdateFeatureConfigAction implements Executable<UpdateFeatureConfigResponse> {
  constructor(
    public readonly featureType: number,
    public readonly configData: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateFeatureConfig`;

    const body: Record<string, unknown> = {
      FeatureType: this.featureType,
      ConfigData: this.configData,
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

  async parseResponse(response: Response): Promise<UpdateFeatureConfigResponse> {
    // No return value (204 No Content)
    return {};
  }
}
