import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule action
 */
export interface msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule action
 *
 * Unbound action
 */
export class msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleAction implements Executable<msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GBMSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse;
    return (await response.json()) as msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
