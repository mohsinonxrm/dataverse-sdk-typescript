import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse as msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponseData } from "./types/index.js";

/**
 * msdyn_LineChannelConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_LineChannelConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_LineChannelConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LineChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_LineChannelConfigurationShouldHaveWorkStreamRule response message
 */
export class msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponseData) {
    super("msdyn_LineChannelConfigurationShouldHaveWorkStreamRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse(
      responseObject<msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponseData>(data)
    );
  }
}
