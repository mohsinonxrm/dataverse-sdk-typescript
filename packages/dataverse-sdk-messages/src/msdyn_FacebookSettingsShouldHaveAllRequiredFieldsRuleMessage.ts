import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse as msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse({});
    return msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponseData) {
    super("msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse(
      responseObject<msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponseData>(data)
    );
  }
}
