import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_LineSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_LineSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_LineSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LineSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    const data = await response.json();
    return msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_LineSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse) {
    super("msdyn_LineSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(data: unknown): msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse((data as any).value);
  }
}
