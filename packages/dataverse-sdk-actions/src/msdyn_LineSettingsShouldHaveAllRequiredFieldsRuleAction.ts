import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_LineSettingsShouldHaveAllRequiredFieldsRule action
 */
export interface msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_LineSettingsShouldHaveAllRequiredFieldsRule action
 *
 * Unbound action
 */
export class msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleAction implements Executable<msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LineSettingsShouldHaveAllRequiredFieldsRule`;

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
  ): Promise<msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse;
    return (await response.json()) as msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
