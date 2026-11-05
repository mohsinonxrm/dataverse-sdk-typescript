import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule action
 */
export interface msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule action
 *
 * Unbound action
 */
export class msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleAction implements Executable<msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    const data = await response.json();
    return data as msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
