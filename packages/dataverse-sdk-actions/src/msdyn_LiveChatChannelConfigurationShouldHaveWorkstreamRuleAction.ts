import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse;
  }
}
