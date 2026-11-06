import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse as msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponseData } from "./types/index.js";

/**
 * msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponseData) {
    super("msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse(
      responseObject<msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponseData>(data)
    );
  }
}
