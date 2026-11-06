import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse as msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponseData } from "./types/index.js";

/**
 * msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponseData) {
    super("msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse(
      responseObject<msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponseData>(data)
    );
  }
}
