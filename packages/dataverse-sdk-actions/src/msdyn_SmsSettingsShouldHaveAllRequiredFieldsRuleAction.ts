import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule action
 */
export interface msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule action
 *
 * Unbound action
 */
export class msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleAction implements Executable<msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse> {
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
    const data = await response.json();
    return data as msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
