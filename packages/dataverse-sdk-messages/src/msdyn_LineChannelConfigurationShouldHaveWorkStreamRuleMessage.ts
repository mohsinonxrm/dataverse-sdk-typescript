import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_LineChannelConfigurationShouldHaveWorkStreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_LineChannelConfigurationShouldHaveWorkStreamRule response message
 *
 * `result` is the value the msdyn_LineChannelConfigurationShouldHaveWorkStreamRule action returns (see {@link msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResult}).
 */
export class msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResult) {
    super("msdyn_LineChannelConfigurationShouldHaveWorkStreamRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse(
      data as msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResult
    );
  }
}
