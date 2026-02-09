import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { FeatureControlSettingData } from "./types/index.js";

/**
 * Response from RetrieveFeatureControlSettings action
 */
export interface RetrieveFeatureControlSettingsResponse {
  FeatureControlSettingCollection: FeatureControlSettingData[];
}

/**
 * RetrieveFeatureControlSettings action
 *
 * Unbound action
 */
export class RetrieveFeatureControlSettingsAction implements Executable<RetrieveFeatureControlSettingsResponse> {
  constructor(
    public readonly namespaceValue: string,
    public readonly featureControlName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlSettings`;

    const body: Record<string, unknown> = {
      NamespaceValue: this.namespaceValue,
      FeatureControlName: this.featureControlName,
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

  async parseResponse(response: Response): Promise<RetrieveFeatureControlSettingsResponse> {
    const data = await response.json();
    return data as RetrieveFeatureControlSettingsResponse;
  }
}
