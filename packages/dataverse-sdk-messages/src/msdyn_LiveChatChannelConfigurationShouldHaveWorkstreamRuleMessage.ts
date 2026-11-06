import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse as msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse.fromResponse({});
    return msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule response message
 */
export class msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponseData
  ) {
    super("msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse {
    return new msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse(
      responseObject<msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponseData>(data)
    );
  }
}
