import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    const data = await response.json();
    return msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse) {
    super("msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse((data as any).value);
  }
}
