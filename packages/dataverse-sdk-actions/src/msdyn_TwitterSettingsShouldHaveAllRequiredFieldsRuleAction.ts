import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule action
 */
export interface msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule action
 *
 * Unbound action
 */
export class msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleAction implements Executable<msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse;
    return (await response.json()) as msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
