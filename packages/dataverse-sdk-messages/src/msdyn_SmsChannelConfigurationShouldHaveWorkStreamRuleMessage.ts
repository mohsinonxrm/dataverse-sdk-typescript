import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse as msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponseData } from "./types/index.js";

/**
 * msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponseData) {
    super("msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse(
      responseObject<msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponseData>(data)
    );
  }
}
