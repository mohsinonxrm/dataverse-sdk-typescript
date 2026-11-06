import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { RetrieveFeatureControlStringSettingsForNamespaceResponse as RetrieveFeatureControlStringSettingsForNamespaceResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return RetrieveFeatureControlStringSettingsForNamespaceResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
