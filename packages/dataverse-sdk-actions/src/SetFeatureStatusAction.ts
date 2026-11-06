import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SetFeatureStatus action
 */
export interface SetFeatureStatusResponse {
  // No content returned
}

/**
 * SetFeatureStatus action
 *
 * Unbound action
 */
export class SetFeatureStatusAction implements Executable<SetFeatureStatusResponse> {
  constructor(
    public readonly featureType: number,
    public readonly status: boolean,
    public readonly configData?: string,
    public readonly isSolutionUninstall?: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetFeatureStatus`;

    const body: Record<string, unknown> = {
      FeatureType: this.featureType,
      Status: this.status,
      ConfigData: this.configData,
      IsSolutionUninstall: this.isSolutionUninstall,
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

  async parseResponse(response: Response): Promise<SetFeatureStatusResponse> {
    // No return value (204 No Content)
    return {};
  }
}
