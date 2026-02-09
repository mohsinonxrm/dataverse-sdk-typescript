import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    const data = await response.json();
    return msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse) {
    super("msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse(
      (data as any).value
    );
  }
}
