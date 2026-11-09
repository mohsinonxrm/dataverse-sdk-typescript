import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { FeatureControlStringSettingData } from "./types/index.js";

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
    // The body is the complex value, with its @odata.context
    return GetFeatureControlStringSettingsForNamespaceWithUserContextResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the GetFeatureControlStringSettingsForNamespaceWithUserContext action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetFeatureControlStringSettingsForNamespaceWithUserContextResult {
  "@odata.context"?: string;
  FeatureControlStringSettingCollection: FeatureControlStringSettingData[];
}

/**
 * GetFeatureControlStringSettingsForNamespaceWithUserContext response message
 *
 * `result` is the value the GetFeatureControlStringSettingsForNamespaceWithUserContext action returns (see {@link GetFeatureControlStringSettingsForNamespaceWithUserContextResult}).
 */
export class GetFeatureControlStringSettingsForNamespaceWithUserContextResponse extends OrganizationResponse {
  constructor(public result: GetFeatureControlStringSettingsForNamespaceWithUserContextResult) {
    super("GetFeatureControlStringSettingsForNamespaceWithUserContext");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): GetFeatureControlStringSettingsForNamespaceWithUserContextResponse {
    return new GetFeatureControlStringSettingsForNamespaceWithUserContextResponse(
      data as GetFeatureControlStringSettingsForNamespaceWithUserContextResult
    );
  }
}
