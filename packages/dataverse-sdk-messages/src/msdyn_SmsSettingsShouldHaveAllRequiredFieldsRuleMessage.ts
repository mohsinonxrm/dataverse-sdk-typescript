import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule response message
 *
 * `result` is the value the msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule action returns (see {@link msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResult}).
 */
export class msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResult) {
    super("msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse(
      data as msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResult
    );
  }
}
