import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      NamespaceName: this.namespaceName,
    };
  }
}

/**
 * RetrieveFeatureControlSettingsByNamespace response message
 */
export class RetrieveFeatureControlSettingsByNamespaceResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlSettingsByNamespaceResponse) {
    super("RetrieveFeatureControlSettingsByNamespace");
  }

  static fromResponse(data: unknown): RetrieveFeatureControlSettingsByNamespaceResponse {
    return new RetrieveFeatureControlSettingsByNamespaceResponse((data as any).value);
  }
}
