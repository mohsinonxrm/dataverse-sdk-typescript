import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule request message
 *
 * Web API Action: msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule
 */
export class msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse>
{
  constructor() {
    super("msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule`;

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
  ): Promise<msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse> {
    const data = await response.json();
    return msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule response message
 */
export class msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse) {
    super("msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse {
    return new msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse(
      (data as any).value
    );
  }
}
