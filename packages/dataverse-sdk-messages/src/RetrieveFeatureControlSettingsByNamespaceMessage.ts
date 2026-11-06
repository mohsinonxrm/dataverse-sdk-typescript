import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { RetrieveFeatureControlSettingsByNamespaceResponse as RetrieveFeatureControlSettingsByNamespaceResponseData } from "./types/index.js";

/**
 * Parameters of the RetrieveFeatureControlSettingsByNamespace message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFeatureControlSettingsByNamespaceRequestParameters {
  NamespaceName: string;
}

/**
 * RetrieveFeatureControlSettingsByNamespace request message
 *
 * Web API Action: RetrieveFeatureControlSettingsByNamespace
 */
export class RetrieveFeatureControlSettingsByNamespaceRequest
  extends OrganizationRequest
  implements Executable<RetrieveFeatureControlSettingsByNamespaceResponse>
{
  declare readonly Parameters: Readonly<RetrieveFeatureControlSettingsByNamespaceRequestParameters>;

  constructor(parameters: RetrieveFeatureControlSettingsByNamespaceRequestParameters) {
    super("RetrieveFeatureControlSettingsByNamespace", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlSettingsByNamespace`;

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
  ): Promise<RetrieveFeatureControlSettingsByNamespaceResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return RetrieveFeatureControlSettingsByNamespaceResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
