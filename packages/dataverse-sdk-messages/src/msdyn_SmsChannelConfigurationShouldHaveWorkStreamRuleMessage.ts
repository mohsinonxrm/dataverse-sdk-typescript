import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule response message
 *
 * `result` is the value the msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule action returns (see {@link msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResult}).
 */
export class msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResult) {
    super("msdyn_SmsChannelConfigurationShouldHaveWorkStreamRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse(
      data as msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResult
    );
  }
}
