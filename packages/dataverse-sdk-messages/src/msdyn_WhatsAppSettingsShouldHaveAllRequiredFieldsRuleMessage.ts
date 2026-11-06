import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule request message
 *
 * Web API Action: msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule
 */
export class msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse>
{
  constructor() {
    super("msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule response message
 *
 * `result` is the value the msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule action returns (see {@link msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResult}).
 */
export class msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResult) {
    super("msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse(
      data as msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResult
    );
  }
}
