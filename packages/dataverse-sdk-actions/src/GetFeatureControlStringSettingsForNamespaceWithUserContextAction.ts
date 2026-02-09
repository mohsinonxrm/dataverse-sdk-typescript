import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { FeatureControlStringSettingData } from "./types/index.js";

/**
 * Response from GetFeatureControlStringSettingsForNamespaceWithUserContext action
 */
export interface GetFeatureControlStringSettingsForNamespaceWithUserContextResponse {
  FeatureControlStringSettingCollection: FeatureControlStringSettingData[];
}

/**
 * GetFeatureControlStringSettingsForNamespaceWithUserContext action
 *
 * Unbound action
 */
export class GetFeatureControlStringSettingsForNamespaceWithUserContextAction implements Executable<GetFeatureControlStringSettingsForNamespaceWithUserContextResponse> {
  constructor(
    public readonly namespaceName: string,
    public readonly featureControlSettingNames: string[],
    public readonly additionalFilterNames: string[],
    public readonly additionalFilterValues: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetFeatureControlStringSettingsForNamespaceWithUserContext`;

    const body: Record<string, unknown> = {
      NamespaceName: this.namespaceName,
      FeatureControlSettingNames: this.featureControlSettingNames,
      AdditionalFilterNames: this.additionalFilterNames,
      AdditionalFilterValues: this.additionalFilterValues,
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

  async parseResponse(
    response: Response
  ): Promise<GetFeatureControlStringSettingsForNamespaceWithUserContextResponse> {
    const data = await response.json();
    return data as GetFeatureControlStringSettingsForNamespaceWithUserContextResponse;
  }
}
