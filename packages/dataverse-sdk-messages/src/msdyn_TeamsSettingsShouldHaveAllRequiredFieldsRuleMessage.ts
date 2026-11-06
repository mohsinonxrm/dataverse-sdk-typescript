import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule response message
 *
 * `result` is the value the msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule action returns (see {@link msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResult}).
 */
export class msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResult) {
    super("msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse(
      data as msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResult
    );
  }
}
