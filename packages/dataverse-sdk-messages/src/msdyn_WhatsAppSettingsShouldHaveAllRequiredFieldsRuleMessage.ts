import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse as msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse({});
    return msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule response message
 */
export class msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponseData) {
    super("msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule");
  }

  static fromResponse(
    data: unknown
  ): msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse {
    return new msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse(
      responseObject<msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponseData>(data)
    );
  }
}
