import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule response message
 *
 * `result` is the value the msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule action returns (see {@link msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResult}).
 */
export class msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResult) {
    super("msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse(
      data as msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResult
    );
  }
}
