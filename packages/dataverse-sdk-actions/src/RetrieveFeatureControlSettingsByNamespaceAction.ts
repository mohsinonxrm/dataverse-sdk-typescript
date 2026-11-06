import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { FeatureControlSettingData } from "./types/index.js";

/**
 * Response from RetrieveFeatureControlSettingsByNamespace action
 */
export interface RetrieveFeatureControlSettingsByNamespaceResponse {
  FeatureControlSettingCollection: FeatureControlSettingData[];
}

/**
 * Parameters of the RetrieveFeatureControlSettingsByNamespace action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFeatureControlSettingsByNamespaceActionParameters {
  NamespaceName: string;
}

/**
 * RetrieveFeatureControlSettingsByNamespace action
 *
 * Unbound action
 */
export class RetrieveFeatureControlSettingsByNamespaceAction implements Executable<RetrieveFeatureControlSettingsByNamespaceResponse> {
  constructor(
    public readonly parameters: RetrieveFeatureControlSettingsByNamespaceActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlSettingsByNamespace`;

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
  ): Promise<RetrieveFeatureControlSettingsByNamespaceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveFeatureControlSettingsByNamespaceResponse;
    return (await response.json()) as RetrieveFeatureControlSettingsByNamespaceResponse;
  }
}
