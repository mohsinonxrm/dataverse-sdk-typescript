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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule response message
 *
 * `result` is the value the msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule action returns (see {@link msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResult}).
 */
export class msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResult) {
    super("msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse {
    return new msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse(
      data as msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResult
    );
  }
}
