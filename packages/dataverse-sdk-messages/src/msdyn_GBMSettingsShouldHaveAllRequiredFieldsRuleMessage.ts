import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    const data = await response.json();
    return msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse) {
    super("msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(data: unknown): msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse((data as any).value);
  }
}
