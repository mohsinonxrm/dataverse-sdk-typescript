import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { GetFeatureControlStringSettingsForNamespaceWithUserContextResponse as GetFeatureControlStringSettingsForNamespaceWithUserContextResponseData } from "./types/index.js";

/**
 * Parameters of the GetFeatureControlStringSettingsForNamespaceWithUserContext message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetFeatureControlStringSettingsForNamespaceWithUserContextRequestParameters {
  NamespaceName: string;
  FeatureControlSettingNames: string[];
  AdditionalFilterNames: string[];
  AdditionalFilterValues: string[];
}

/**
 * GetFeatureControlStringSettingsForNamespaceWithUserContext request message
 *
 * Web API Action: GetFeatureControlStringSettingsForNamespaceWithUserContext
 */
export class GetFeatureControlStringSettingsForNamespaceWithUserContextRequest
  extends OrganizationRequest
  implements Executable<GetFeatureControlStringSettingsForNamespaceWithUserContextResponse>
{
  declare readonly Parameters: Readonly<GetFeatureControlStringSettingsForNamespaceWithUserContextRequestParameters>;

  constructor(
    parameters: GetFeatureControlStringSettingsForNamespaceWithUserContextRequestParameters
  ) {
    super("GetFeatureControlStringSettingsForNamespaceWithUserContext", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetFeatureControlStringSettingsForNamespaceWithUserContext`;

    const body = requestBody({
      NamespaceName: this.Parameters.NamespaceName,
      FeatureControlSettingNames: this.Parameters.FeatureControlSettingNames,
      AdditionalFilterNames: this.Parameters.AdditionalFilterNames,
      AdditionalFilterValues: this.Parameters.AdditionalFilterValues,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return GetFeatureControlStringSettingsForNamespaceWithUserContextResponse.fromResponse({});
    return GetFeatureControlStringSettingsForNamespaceWithUserContextResponse.fromResponse(
      await response.json()
    );
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
