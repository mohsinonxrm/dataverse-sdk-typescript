import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveFeatureControlSetting request message
 *
 * Web API Action: RetrieveFeatureControlSetting
 */
export class RetrieveFeatureControlSettingRequest
  extends OrganizationRequest
  implements Executable<RetrieveFeatureControlSettingResponse>
{
  constructor(
    public namespaceValue: string,
    public featureControlName: string
  ) {
    super("RetrieveFeatureControlSetting");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveFeatureControlSetting`;

    const body: Record<string, unknown> = {
      NamespaceValue: this.namespaceValue,
      FeatureControlName: this.featureControlName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RetrieveFeatureControlSettingResponse> {
    const data = await response.json();
    return RetrieveFeatureControlSettingResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      NamespaceValue: this.namespaceValue,
      FeatureControlName: this.featureControlName,
    };
  }
}

/**
 * RetrieveFeatureControlSetting response message
 */
export class RetrieveFeatureControlSettingResponse extends OrganizationResponse {
  constructor(public result: RetrieveFeatureControlSettingResponse) {
    super("RetrieveFeatureControlSetting");
  }

  static fromResponse(data: unknown): RetrieveFeatureControlSettingResponse {
    return new RetrieveFeatureControlSettingResponse((data as any).value);
  }
}
