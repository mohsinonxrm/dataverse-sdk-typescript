import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { FeatureControlSettingData } from "./types/index.js";

/**
 * Response from the RetrieveFeatureControlSettingsByNamespace action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFeatureControlSettingsByNamespaceResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveFeatureControlSettingsByNamespaceResponse;
  }
}
