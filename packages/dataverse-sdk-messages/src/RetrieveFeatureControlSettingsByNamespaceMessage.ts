import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { RetrieveFeatureControlSettingsByNamespaceResponse as RetrieveFeatureControlSettingsByNamespaceResponseData } from "./types/index.js";

/**
 * RetrieveFeatureControlSettingsByNamespace request message
 *
 * Web API Action: RetrieveFeatureControlSettingsByNamespace
 */
export class RetrieveFeatureControlSettingsByNamespaceRequest
  extends OrganizationRequest
  implements Executable<RetrieveFeatureControlSettingsByNamespaceResponse>
{
  constructor(public namespaceName: string) {
    super("RetrieveFeatureControlSettingsByNamespace");
  }

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
    return RetrieveFeatureControlSettingsByNamespaceResponse.fromResponse(data);
  }
}

/**
 * RetrieveFeatureControlSettingsByNamespace response message
 */
export class RetrieveFeatureControlSettingsByNamespaceResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlSettingsByNamespaceResponseData) {
    super("RetrieveFeatureControlSettingsByNamespace");
  }

  static fromResponse(data: unknown): RetrieveFeatureControlSettingsByNamespaceResponse {
    return new RetrieveFeatureControlSettingsByNamespaceResponse(
      responseObject<RetrieveFeatureControlSettingsByNamespaceResponseData>(data)
    );
  }
}
