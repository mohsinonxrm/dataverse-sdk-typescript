import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { FeatureControlStringSettingData } from "./types/index.js";

/**
 * Parameters of the RetrieveFeatureControlStringSettingsForNamespace message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFeatureControlStringSettingsForNamespaceRequestParameters {
  NamespaceName: string;
}

/**
 * RetrieveFeatureControlStringSettingsForNamespace request message
 *
 * Web API Action: RetrieveFeatureControlStringSettingsForNamespace
 */
export class RetrieveFeatureControlStringSettingsForNamespaceRequest
  extends OrganizationRequest
  implements Executable<RetrieveFeatureControlStringSettingsForNamespaceResponse>
{
  declare readonly Parameters: Readonly<RetrieveFeatureControlStringSettingsForNamespaceRequestParameters>;

  constructor(parameters: RetrieveFeatureControlStringSettingsForNamespaceRequestParameters) {
    super("RetrieveFeatureControlStringSettingsForNamespace", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlStringSettingsForNamespace`;

    const body = requestBody({
      NamespaceName: this.Parameters.NamespaceName,
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
    return RetrieveFeatureControlStringSettingsForNamespaceResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the RetrieveFeatureControlStringSettingsForNamespace action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFeatureControlStringSettingsForNamespaceResult {
  "@odata.context"?: string;
  FeatureControlStringSettingCollection: FeatureControlStringSettingData[];
}

/**
 * RetrieveFeatureControlStringSettingsForNamespace response message
 *
 * `result` is the value the RetrieveFeatureControlStringSettingsForNamespace action returns (see {@link RetrieveFeatureControlStringSettingsForNamespaceResult}).
 */
export class RetrieveFeatureControlStringSettingsForNamespaceResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlStringSettingsForNamespaceResult) {
    super("RetrieveFeatureControlStringSettingsForNamespace");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveFeatureControlStringSettingsForNamespaceResponse {
    return new RetrieveFeatureControlStringSettingsForNamespaceResponse(
      data as RetrieveFeatureControlStringSettingsForNamespaceResult
    );
  }
}
