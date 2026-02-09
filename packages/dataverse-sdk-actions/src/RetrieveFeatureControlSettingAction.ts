import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { FeatureControlSettingData } from "./types/index.js";

/**
 * Response from RetrieveFeatureControlSetting action
 */
export interface RetrieveFeatureControlSettingResponse {
  FeatureControlSetting: FeatureControlSettingData;
}

/**
 * RetrieveFeatureControlSetting action
 *
 * Unbound action
 */
export class RetrieveFeatureControlSettingAction implements Executable<RetrieveFeatureControlSettingResponse> {
  constructor(
    public readonly namespaceValue: string,
    public readonly featureControlName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlSetting`;

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

  async parseResponse(response: Response): Promise<RetrieveFeatureControlSettingResponse> {
    const data = await response.json();
    return data as RetrieveFeatureControlSettingResponse;
  }
}
