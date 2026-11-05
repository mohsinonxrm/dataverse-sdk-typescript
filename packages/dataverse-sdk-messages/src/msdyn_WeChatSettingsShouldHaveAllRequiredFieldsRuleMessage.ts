import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    const data = await response.json();
    return msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse) {
    super("msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(data: unknown): msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse((data as any).value);
  }
}
