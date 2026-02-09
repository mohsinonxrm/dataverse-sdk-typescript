import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    const data = await response.json();
    return msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse) {
    super("msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(data: unknown): msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse((data as any).value);
  }
}
