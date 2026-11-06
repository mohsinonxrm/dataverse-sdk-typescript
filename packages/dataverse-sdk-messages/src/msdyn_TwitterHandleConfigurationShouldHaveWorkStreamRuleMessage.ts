import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule request message
 *
 * Web API Action: msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule
 */
export class msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse>
{
  constructor() {
    super("msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule`;

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
  ): Promise<msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule response message
 *
 * `result` is the value the msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule action returns (see {@link msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResult}).
 */
export class msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResult) {
    super("msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse {
    return new msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse(
      data as msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResult
    );
  }
}
