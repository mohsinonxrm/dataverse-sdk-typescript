import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule response message
 *
 * `result` is the value the msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule action returns (see {@link msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResult}).
 */
export class msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResult) {
    super("msdyn_FacebookPageConfigurationShouldHaveWorkStreamRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse(
      data as msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResult
    );
  }
}
