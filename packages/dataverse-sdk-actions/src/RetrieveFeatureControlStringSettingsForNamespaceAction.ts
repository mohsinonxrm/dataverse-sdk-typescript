import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { FeatureControlStringSettingData } from "./types/index.js";

/**
 * Response from RetrieveFeatureControlStringSettingsForNamespace action
 */
export interface RetrieveFeatureControlStringSettingsForNamespaceResponse {
  FeatureControlStringSettingCollection: FeatureControlStringSettingData[];
}

/**
 * RetrieveFeatureControlStringSettingsForNamespace action
 *
 * Unbound action
 */
export class RetrieveFeatureControlStringSettingsForNamespaceAction implements Executable<RetrieveFeatureControlStringSettingsForNamespaceResponse> {
  constructor(public readonly namespaceName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlStringSettingsForNamespace`;

    const body: Record<string, unknown> = {
      NamespaceName: this.namespaceName,
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

  async parseResponse(
    response: Response
  ): Promise<RetrieveFeatureControlStringSettingsForNamespaceResponse> {
    const data = await response.json();
    return data as RetrieveFeatureControlStringSettingsForNamespaceResponse;
  }
}
