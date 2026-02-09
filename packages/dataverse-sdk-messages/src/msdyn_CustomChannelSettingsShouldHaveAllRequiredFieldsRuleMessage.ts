import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    const data = await response.json();
    return msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse) {
    super("msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse(
      (data as any).value
    );
  }
}
