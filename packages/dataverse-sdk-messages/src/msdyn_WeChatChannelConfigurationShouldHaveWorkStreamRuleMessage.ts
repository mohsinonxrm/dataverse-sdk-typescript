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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule response message
 *
 * `result` is the value the msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule action returns (see {@link msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResult}).
 */
export class msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResult) {
    super("msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse(
      data as msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResult
    );
  }
}
