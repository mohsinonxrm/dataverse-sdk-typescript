import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule response message
 *
 * `result` is the value the msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule action returns (see {@link msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResult}).
 */
export class msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResult) {
    super("msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse(
      data as msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResult
    );
  }
}
