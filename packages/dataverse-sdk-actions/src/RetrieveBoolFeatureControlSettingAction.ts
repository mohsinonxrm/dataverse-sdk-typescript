import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveBoolFeatureControlSetting action
 */
export interface RetrieveBoolFeatureControlSettingResponse {
  IsEnabled: boolean;
}

/**
 * RetrieveBoolFeatureControlSetting action
 *
 * Unbound action
 */
export class RetrieveBoolFeatureControlSettingAction implements Executable<RetrieveBoolFeatureControlSettingResponse> {
  constructor(
    public readonly namespaceValue: string,
    public readonly featureControlName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveBoolFeatureControlSetting`;

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

  async parseResponse(response: Response): Promise<RetrieveBoolFeatureControlSettingResponse> {
    const data = await response.json();
    return data as RetrieveBoolFeatureControlSettingResponse;
  }
}
