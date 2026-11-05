import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { FeatureControlSettingData } from "./types/index.js";

/**
 * Response from RetrieveFeatureControlSettingsByNamespace action
 */
export interface RetrieveFeatureControlSettingsByNamespaceResponse {
  FeatureControlSettingCollection: FeatureControlSettingData[];
}

/**
 * RetrieveFeatureControlSettingsByNamespace action
 *
 * Unbound action
 */
export class RetrieveFeatureControlSettingsByNamespaceAction implements Executable<RetrieveFeatureControlSettingsByNamespaceResponse> {
  constructor(public readonly namespaceName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlSettingsByNamespace`;

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
  ): Promise<RetrieveFeatureControlSettingsByNamespaceResponse> {
    const data = await response.json();
    return data as RetrieveFeatureControlSettingsByNamespaceResponse;
  }
}
