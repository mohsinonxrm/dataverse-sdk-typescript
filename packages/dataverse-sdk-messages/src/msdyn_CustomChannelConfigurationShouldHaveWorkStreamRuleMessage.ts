import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse as msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponseData } from "./types/index.js";

/**
 * msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse({});
    return msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponseData) {
    super("msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse(
      responseObject<msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponseData>(data)
    );
  }
}
