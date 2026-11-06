import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_LineSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_LineSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_LineSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LineSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_LineSettingsShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_LineSettingsShouldHaveAllRequiredFieldsRule response message
 *
 * `result` is the value the msdyn_LineSettingsShouldHaveAllRequiredFieldsRule action returns (see {@link msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResult}).
 */
export class msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResult) {
    super("msdyn_LineSettingsShouldHaveAllRequiredFieldsRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse(
      data as msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResult
    );
  }
}
