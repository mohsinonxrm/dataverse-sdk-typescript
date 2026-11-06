import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse as msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse({});
    return msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponseData) {
    super("msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(data: unknown): msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse(
      responseObject<msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponseData>(data)
    );
  }
}
