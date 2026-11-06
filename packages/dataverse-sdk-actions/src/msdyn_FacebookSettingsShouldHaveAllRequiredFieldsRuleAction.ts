import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule action
 */
export interface msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule action
 *
 * Unbound action
 */
export class msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleAction implements Executable<msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse;
    return (await response.json()) as msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
