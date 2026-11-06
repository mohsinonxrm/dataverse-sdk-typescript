import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GBMConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_GBMConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_GBMConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_GBMConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GBMConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_GBMConfigurationShouldHaveWorkStreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GBMConfigurationShouldHaveWorkStreamRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_GBMConfigurationShouldHaveWorkStreamRule response message
 *
 * `result` is the value the msdyn_GBMConfigurationShouldHaveWorkStreamRule action returns (see {@link msdyn_GBMConfigurationShouldHaveWorkStreamRuleResult}).
 */
export class msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_GBMConfigurationShouldHaveWorkStreamRuleResult) {
    super("msdyn_GBMConfigurationShouldHaveWorkStreamRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse(
      data as msdyn_GBMConfigurationShouldHaveWorkStreamRuleResult
    );
  }
}
