import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveBoolFeatureControlSetting request message
 *
 * Web API Action: RetrieveBoolFeatureControlSetting
 */
export class RetrieveBoolFeatureControlSettingRequest
  extends OrganizationRequest
  implements Executable<RetrieveBoolFeatureControlSettingResponse>
{
  constructor(
    public namespaceValue: string,
    public featureControlName: string
  ) {
    super("RetrieveBoolFeatureControlSetting");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveBoolFeatureControlSetting`;

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

  async parseResponse(response: Response): Promise<RetrieveBoolFeatureControlSettingResponse> {
    const data = await response.json();
    return RetrieveBoolFeatureControlSettingResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      NamespaceValue: this.namespaceValue,
      FeatureControlName: this.featureControlName,
    };
  }
}

/**
 * RetrieveBoolFeatureControlSetting response message
 */
export class RetrieveBoolFeatureControlSettingResponse extends OrganizationResponse {
  constructor(public result: RetrieveBoolFeatureControlSettingResponse) {
    super("RetrieveBoolFeatureControlSetting");
  }

  static fromResponse(data: unknown): RetrieveBoolFeatureControlSettingResponse {
    return new RetrieveBoolFeatureControlSettingResponse((data as any).value);
  }
}
