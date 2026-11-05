import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse as msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponseData } from "./types/index.js";

/**
 * msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    const data = await response.json();
    return msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(data);
  }
}

/**
 * msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponseData
  ) {
    super("msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse(
      responseObject<msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponseData>(data)
    );
  }
}
