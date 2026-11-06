import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_LineSettingsShouldHaveAllRequiredFieldsRule action
 */
export interface msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse;
  }
}
