import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule response message
 *
 * `result` is the value the msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule action returns (see {@link msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResult}).
 */
export class msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResult) {
    super("msdyn_CustomChannelConfigurationShouldHaveWorkStreamRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse(
      data as msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResult
    );
  }
}
