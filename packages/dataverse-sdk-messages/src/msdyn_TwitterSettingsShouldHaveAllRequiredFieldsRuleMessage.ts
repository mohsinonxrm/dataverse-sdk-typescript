import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse as msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponseData } from "./types/index.js";

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
}

/**
 * msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponseData) {
    super("msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(data: unknown): msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse(
      responseObject<msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponseData>(data)
    );
  }
}
