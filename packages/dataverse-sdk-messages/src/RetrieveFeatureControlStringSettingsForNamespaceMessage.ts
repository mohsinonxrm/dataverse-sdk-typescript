import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { RetrieveFeatureControlStringSettingsForNamespaceResponse as RetrieveFeatureControlStringSettingsForNamespaceResponseData } from "./types/index.js";

/**
 * RetrieveFeatureControlStringSettingsForNamespace request message
 *
 * Web API Action: RetrieveFeatureControlStringSettingsForNamespace
 */
export class RetrieveFeatureControlStringSettingsForNamespaceRequest
  extends OrganizationRequest
  implements Executable<RetrieveFeatureControlStringSettingsForNamespaceResponse>
{
  constructor(public namespaceName: string) {
    super("RetrieveFeatureControlStringSettingsForNamespace");
  }

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
    return RetrieveFeatureControlStringSettingsForNamespaceResponse.fromResponse(data);
  }
}

/**
 * RetrieveFeatureControlStringSettingsForNamespace response message
 */
export class RetrieveFeatureControlStringSettingsForNamespaceResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlStringSettingsForNamespaceResponseData) {
    super("RetrieveFeatureControlStringSettingsForNamespace");
  }

  static fromResponse(data: unknown): RetrieveFeatureControlStringSettingsForNamespaceResponse {
    return new RetrieveFeatureControlStringSettingsForNamespaceResponse(
      responseObject<RetrieveFeatureControlStringSettingsForNamespaceResponseData>(data)
    );
  }
}
