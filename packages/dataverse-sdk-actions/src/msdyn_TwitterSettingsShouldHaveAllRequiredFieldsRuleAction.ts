import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRule action
 */
export interface msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
