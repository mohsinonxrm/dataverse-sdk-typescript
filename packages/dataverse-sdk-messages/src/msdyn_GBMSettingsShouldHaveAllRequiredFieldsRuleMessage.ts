import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule response message
 *
 * `result` is the value the msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule action returns (see {@link msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResult}).
 */
export class msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResult) {
    super("msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse(
      data as msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResult
    );
  }
}
