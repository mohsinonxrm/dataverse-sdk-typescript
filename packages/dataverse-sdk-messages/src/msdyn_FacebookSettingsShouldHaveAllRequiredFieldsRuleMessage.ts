import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule response message
 *
 * `result` is the value the msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule action returns (see {@link msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResult}).
 */
export class msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResult) {
    super("msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse(
      data as msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResult
    );
  }
}
