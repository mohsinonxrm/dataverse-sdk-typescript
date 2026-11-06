import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRule action
 */
export interface msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse;
    return (await response.json()) as msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
