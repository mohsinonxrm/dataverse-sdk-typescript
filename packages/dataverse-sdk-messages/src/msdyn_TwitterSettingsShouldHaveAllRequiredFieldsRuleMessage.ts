import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    const data = await response.json();
    return msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse) {
    super("msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(data: unknown): msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse((data as any).value);
  }
}
