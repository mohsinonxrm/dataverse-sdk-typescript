import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { RetrieveFeatureControlSettingsResponse as RetrieveFeatureControlSettingsResponseData } from "./types/index.js";

/**
 * RetrieveFeatureControlSettings request message
 *
 * Web API Action: RetrieveFeatureControlSettings
 */
export class RetrieveFeatureControlSettingsRequest
  extends OrganizationRequest
  implements Executable<RetrieveFeatureControlSettingsResponse>
{
  constructor(
    public namespaceValue: string,
    public featureControlName: string
  ) {
    super("RetrieveFeatureControlSettings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlSettings`;

    const body: Record<string, unknown> = {
      NamespaceValue: this.namespaceValue,
      FeatureControlName: this.featureControlName,
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

  async parseResponse(response: Response): Promise<RetrieveFeatureControlSettingsResponse> {
    const data = await response.json();
    return RetrieveFeatureControlSettingsResponse.fromResponse(data);
  }
}

/**
 * RetrieveFeatureControlSettings response message
 */
export class RetrieveFeatureControlSettingsResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlSettingsResponseData) {
    super("RetrieveFeatureControlSettings");
  }

  static fromResponse(data: unknown): RetrieveFeatureControlSettingsResponse {
    return new RetrieveFeatureControlSettingsResponse(
      responseObject<RetrieveFeatureControlSettingsResponseData>(data)
    );
  }
}
