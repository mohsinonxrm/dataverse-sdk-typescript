import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetFeatureControlStringSettingsForNamespaceWithUserContext request message
 *
 * Web API Action: GetFeatureControlStringSettingsForNamespaceWithUserContext
 */
export class GetFeatureControlStringSettingsForNamespaceWithUserContextRequest
  extends OrganizationRequest
  implements Executable<GetFeatureControlStringSettingsForNamespaceWithUserContextResponse>
{
  constructor(
    public namespaceName: string,
    public featureControlSettingNames: string[],
    public additionalFilterNames: string[],
    public additionalFilterValues: string[]
  ) {
    super("GetFeatureControlStringSettingsForNamespaceWithUserContext");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<GetFeatureControlStringSettingsForNamespaceWithUserContextResponse> {
    const data = await response.json();
    return GetFeatureControlStringSettingsForNamespaceWithUserContextResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      NamespaceName: this.namespaceName,
      FeatureControlSettingNames: this.featureControlSettingNames,
      AdditionalFilterNames: this.additionalFilterNames,
      AdditionalFilterValues: this.additionalFilterValues,
    };
  }
}

/**
 * GetFeatureControlStringSettingsForNamespaceWithUserContext response message
 */
export class GetFeatureControlStringSettingsForNamespaceWithUserContextResponse extends OrganizationResponse {
  constructor(public result: GetFeatureControlStringSettingsForNamespaceWithUserContextResponse) {
    super("GetFeatureControlStringSettingsForNamespaceWithUserContext");
  }

  static fromResponse(
    data: unknown
  ): GetFeatureControlStringSettingsForNamespaceWithUserContextResponse {
    return new GetFeatureControlStringSettingsForNamespaceWithUserContextResponse(
      (data as any).value
    );
  }
}
