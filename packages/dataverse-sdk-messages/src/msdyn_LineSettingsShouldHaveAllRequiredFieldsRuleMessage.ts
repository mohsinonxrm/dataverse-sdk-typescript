import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse as msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse({});
    return msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_LineSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponseData) {
    super("msdyn_LineSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(data: unknown): msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse(
      responseObject<msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponseData>(data)
    );
  }
}
