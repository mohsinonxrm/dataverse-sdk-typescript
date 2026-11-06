import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule response message
 *
 * `result` is the value the msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule action returns (see {@link msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResult}).
 */
export class msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResult) {
    super("msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse(
      data as msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResult
    );
  }
}
