import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { FeatureControlSettingData } from "./types/index.js";

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
    // The body is the complex value, with its @odata.context
    return RetrieveFeatureControlSettingsByNamespaceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveFeatureControlSettingsByNamespace action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFeatureControlSettingsByNamespaceResult {
  "@odata.context"?: string;
  FeatureControlSettingCollection: FeatureControlSettingData[];
}

/**
 * RetrieveFeatureControlSettingsByNamespace response message
 *
 * `result` is the value the RetrieveFeatureControlSettingsByNamespace action returns (see {@link RetrieveFeatureControlSettingsByNamespaceResult}).
 */
export class RetrieveFeatureControlSettingsByNamespaceResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlSettingsByNamespaceResult) {
    super("RetrieveFeatureControlSettingsByNamespace");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveFeatureControlSettingsByNamespaceResponse {
    return new RetrieveFeatureControlSettingsByNamespaceResponse(
      data as RetrieveFeatureControlSettingsByNamespaceResult
    );
  }
}
