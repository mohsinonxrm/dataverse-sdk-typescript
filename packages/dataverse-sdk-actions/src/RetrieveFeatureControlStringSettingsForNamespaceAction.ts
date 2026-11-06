import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { FeatureControlStringSettingData } from "./types/index.js";

/**
 * Response from the RetrieveFeatureControlStringSettingsForNamespace action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFeatureControlStringSettingsForNamespaceResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveFeatureControlStringSettingsForNamespaceResponse;
  }
}
