import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule action
 */
export interface msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
}

/**
 * msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule action
 *
 * Unbound action
 */
export class msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleAction implements Executable<msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule`;

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
  ): Promise<msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse;
  }
}
