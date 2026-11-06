import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule action
 */
export interface msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse;
    return (await response.json()) as msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse;
  }
}
