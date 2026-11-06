import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { GetFeatureControlStringSettingsForNamespaceWithUserContextResponse as GetFeatureControlStringSettingsForNamespaceWithUserContextResponseData } from "./types/index.js";

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
}

/**
 * GetFeatureControlStringSettingsForNamespaceWithUserContext response message
 */
export class GetFeatureControlStringSettingsForNamespaceWithUserContextResponse extends OrganizationResponse {
  constructor(
    public result: GetFeatureControlStringSettingsForNamespaceWithUserContextResponseData
  ) {
    super("GetFeatureControlStringSettingsForNamespaceWithUserContext");
  }

  static fromResponse(
    data: unknown
  ): GetFeatureControlStringSettingsForNamespaceWithUserContextResponse {
    return new GetFeatureControlStringSettingsForNamespaceWithUserContextResponse(
      responseObject<GetFeatureControlStringSettingsForNamespaceWithUserContextResponseData>(data)
    );
  }
}
