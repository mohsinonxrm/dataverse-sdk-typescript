import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse as msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse({});
    return msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponseData) {
    super("msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(data: unknown): msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse(
      responseObject<msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponseData>(data)
    );
  }
}
