import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule response message
 *
 * `result` is the value the msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule action returns (see {@link msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResult}).
 */
export class msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResult) {
    super("msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse(
      data as msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResult
    );
  }
}
