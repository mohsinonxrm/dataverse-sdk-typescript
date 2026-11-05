import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      NamespaceValue: this.namespaceValue,
      FeatureControlName: this.featureControlName,
    };
  }
}

/**
 * RetrieveFeatureControlSettings response message
 */
export class RetrieveFeatureControlSettingsResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlSettingsResponse) {
    super("RetrieveFeatureControlSettings");
  }

  static fromResponse(data: unknown): RetrieveFeatureControlSettingsResponse {
    return new RetrieveFeatureControlSettingsResponse((data as any).value);
  }
}
