import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { FeatureControlStringSettingData } from "./types/index.js";

/**
 * Response from GetFeatureControlStringSettingsForNamespaceWithUserContext action
 */
export interface GetFeatureControlStringSettingsForNamespaceWithUserContextResponse {
  FeatureControlStringSettingCollection: FeatureControlStringSettingData[];
}

/**
 * Parameters of the GetFeatureControlStringSettingsForNamespaceWithUserContext action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetFeatureControlStringSettingsForNamespaceWithUserContextActionParameters {
  NamespaceName: string;
  FeatureControlSettingNames: string[];
  AdditionalFilterNames: string[];
  AdditionalFilterValues: string[];
}

/**
 * GetFeatureControlStringSettingsForNamespaceWithUserContext action
 *
 * Unbound action
 */
export class GetFeatureControlStringSettingsForNamespaceWithUserContextAction implements Executable<GetFeatureControlStringSettingsForNamespaceWithUserContextResponse> {
  constructor(
    public readonly parameters: GetFeatureControlStringSettingsForNamespaceWithUserContextActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetFeatureControlStringSettingsForNamespaceWithUserContext`;

    const body = requestBody({
      NamespaceName: this.parameters.NamespaceName,
      FeatureControlSettingNames: this.parameters.FeatureControlSettingNames,
      AdditionalFilterNames: this.parameters.AdditionalFilterNames,
      AdditionalFilterValues: this.parameters.AdditionalFilterValues,
    });

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
  ): Promise<GetFeatureControlStringSettingsForNamespaceWithUserContextResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as GetFeatureControlStringSettingsForNamespaceWithUserContextResponse;
  }
}
