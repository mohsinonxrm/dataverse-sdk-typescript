import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { FeatureControlStringSettingData } from "./types/index.js";

/**
 * Response from RetrieveFeatureControlStringSettingsForNamespace action
 */
export interface RetrieveFeatureControlStringSettingsForNamespaceResponse {
  FeatureControlStringSettingCollection: FeatureControlStringSettingData[];
}

/**
 * Parameters of the RetrieveFeatureControlStringSettingsForNamespace action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFeatureControlStringSettingsForNamespaceActionParameters {
  NamespaceName: string;
}

/**
 * RetrieveFeatureControlStringSettingsForNamespace action
 *
 * Unbound action
 */
export class RetrieveFeatureControlStringSettingsForNamespaceAction implements Executable<RetrieveFeatureControlStringSettingsForNamespaceResponse> {
  constructor(
    public readonly parameters: RetrieveFeatureControlStringSettingsForNamespaceActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlStringSettingsForNamespace`;

    const body = requestBody({
      NamespaceName: this.parameters.NamespaceName,
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
  ): Promise<RetrieveFeatureControlStringSettingsForNamespaceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as RetrieveFeatureControlStringSettingsForNamespaceResponse;
    return (await response.json()) as RetrieveFeatureControlStringSettingsForNamespaceResponse;
  }
}
