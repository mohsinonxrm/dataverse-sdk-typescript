import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SmsSettingsShouldHaveAllRequiredFieldsRule action
 */
export interface msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse;
    return (await response.json()) as msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
