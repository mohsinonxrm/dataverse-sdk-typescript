import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule action
 */
export interface msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
}

/**
 * msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule action
 *
 * Unbound action
 */
export class msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleAction implements Executable<msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse> {
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
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse;
  }
}
