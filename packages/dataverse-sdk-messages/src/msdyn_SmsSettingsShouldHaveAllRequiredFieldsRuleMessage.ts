import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    const data = await response.json();
    return msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse) {
    super("msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(data: unknown): msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse((data as any).value);
  }
}
