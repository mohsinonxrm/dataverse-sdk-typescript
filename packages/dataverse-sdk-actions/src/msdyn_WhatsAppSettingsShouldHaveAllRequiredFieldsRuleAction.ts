import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule action
 */
export interface msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule action
 *
 * Unbound action
 */
export class msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleAction implements Executable<msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRule`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    const data = await response.json();
    return data as msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
